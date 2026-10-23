$ErrorActionPreference = 'Stop'
$paths = @('/', '/predict', '/ranks', '/seat-matrix', '/colleges', '/branches', '/guides', '/guides/jee-main-college-predictor', '/guides/josaa-choice-filling-strategy', '/about', '/contact', '/privacy', '/terms', '/methodology', '/robots.txt', '/ads.txt', '/adsense-audit-nonexistent')
$results = @()
foreach ($base in @('https://www.rankmatrix.in', 'http://127.0.0.1:3001')) {
  $adsText = (Invoke-WebRequest -Uri ($base + '/ads.txt') -TimeoutSec 30).Content
  $adsPublisher = ([regex]::Match($adsText, 'pub-\d+')).Value
  foreach ($path in $paths) {
    try {
      $r = Invoke-WebRequest -Uri ($base + $path) -TimeoutSec 30 -SkipHttpErrorCheck
      $html = $r.Content
      $plain = [regex]::Replace($html, '<(script|style)\b[^>]*>[\s\S]*?</\1>', ' ')
      $plain = [System.Net.WebUtility]::HtmlDecode([regex]::Replace($plain, '<[^>]+>', ' '))
      $plain = [regex]::Replace($plain, '\s+', ' ').Trim()
      $results += [pscustomobject]@{
        url = $base + $path; status = [int]$r.StatusCode
        h1Count = ([regex]::Matches($html, '<h1\b')).Count
        tableRowCount = ([regex]::Matches($html, '<tr\b')).Count
        linkCount = ([regex]::Matches($html, '<a\b')).Count
        wordsIncludingNavigation = ($plain -split '\s+').Count
        undefinedNirf = $plain.Contains('NIRF Rank (undefined)')
        legacyEmptyText = $plain.Contains('Data for the applied filters does not exists')
        guaranteedText = $plain.Contains('These guarantee you something acceptable')
        namedHyderabadExample = $plain.Contains('IIIT Hyderabad')
        consentClaim = $plain.Contains("relies on Google's consent management")
        adsenseReference = $html.Contains('pagead2.googlesyndication.com')
        adsenseMeta = $html.Contains('google-adsense-account')
        adsTxtPublisherMatchesHtml = if ($path -eq '/') { $adsPublisher -and $html.Contains($adsPublisher) } else { $null }
        manualAdUnit = $html -match '<ins[^>]*adsbygoogle'
        canonical = ([regex]::Match($html, '<link[^>]*rel="canonical"[^>]*href="([^"]+)"')).Groups[1].Value
        sample = if ($path -in @('/robots.txt','/ads.txt')) { [regex]::Replace($plain, 'pub-\d+', 'pub-[redacted]') } else { $plain.Substring(0,[Math]::Min(220,$plain.Length)) }
      }
    } catch { $results += [pscustomobject]@{url=$base+$path;error=$_.Exception.Message} }
  }
}
$college = Invoke-WebRequest -Uri 'http://127.0.0.1:3001/colleges' -TimeoutSec 30
$institutePath = ([regex]::Match($college.Content, 'href="(/colleges/[^/"?#]+)"')).Groups[1].Value
if ($institutePath) {
  $institute = Invoke-WebRequest -Uri ('http://127.0.0.1:3001' + $institutePath) -TimeoutSec 30
  $pairPath = ([regex]::Match($institute.Content, 'href="(/colleges/[^/"?#]+/[^/"?#]+)"')).Groups[1].Value
  foreach ($path in @($institutePath, $pairPath) | Where-Object { $_ }) {
    foreach ($base in @('https://www.rankmatrix.in', 'http://127.0.0.1:3001')) {
      $r = Invoke-WebRequest -Uri ($base+$path) -TimeoutSec 30 -SkipHttpErrorCheck
      $results += [pscustomobject]@{url=$base+$path;status=[int]$r.StatusCode;h1Count=([regex]::Matches($r.Content,'<h1\b')).Count;tableRowCount=([regex]::Matches($r.Content,'<tr\b')).Count;linkCount=([regex]::Matches($r.Content,'<a\b')).Count}
    }
  }
}
foreach ($url in @('https://rankmatrix.in/ads.txt','http://rankmatrix.in/','https://rankmatrix.in/')) {
  $r = Invoke-WebRequest -Uri $url -TimeoutSec 30 -SkipHttpErrorCheck
  $results += [pscustomobject]@{url=$url;status=[int]$r.StatusCode;finalUrl=$r.BaseResponse.RequestMessage.RequestUri.AbsoluteUri}
}
[pscustomobject]@{checkedAtUtc=[DateTime]::UtcNow.ToString('o');method='Read-only HTTP response HTML, not a rendered browser crawl. Counts include shared navigation; no content threshold is implied.';results=$results} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'adsense-readiness-evidence.json') -Encoding utf8
$results | Select-Object url,status,h1Count,tableRowCount,undefinedNirf,legacyEmptyText | Format-Table -AutoSize
