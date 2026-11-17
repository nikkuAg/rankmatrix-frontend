// The JoSAA institute data spells a few states the old or informal way. Show the
// official names; the stored values (and API searches) are unchanged.
const names = {
  Orissa: 'Odisha',
  Tamilnadu: 'Tamil Nadu',
  Uttrakhand: 'Uttarakhand',
};

export function stateName(state) {
  return names[state] ?? state;
}
