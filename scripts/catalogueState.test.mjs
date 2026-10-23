import assert from 'node:assert/strict';
import { test } from 'node:test';
import { catalogueState } from '../src/utils/catalogue.mjs';

const initial = { page: 1, pageSize: 25, search: '', ordering: null, filters: {} };
const serverData = { data: [{ name: 'Server first page' }] };
const oldData = { data: [{ name: 'Old result' }] };

test('SSR rows survive the initial browser refresh without a loading replacement', () => {
  assert.deepEqual(catalogueState(initial, { isUninitialized: true }, serverData), {
    data: serverData,
    isLoading: false,
  });
  assert.deepEqual(
    catalogueState(initial, { originalArgs: initial, isFetching: true }, serverData),
    {
      data: serverData,
      isLoading: false,
    },
  );
});

test('changed search, filter, sort and page never show a previous request under new controls', () => {
  for (const change of [
    { search: 'NIT' },
    { filters: { type: ['NIT'] } },
    { ordering: 'name' },
    { page: 2 },
  ]) {
    const request = { ...initial, ...change };
    for (const isFetching of [false, true]) {
      assert.deepEqual(
        catalogueState(
          request,
          {
            originalArgs: initial,
            data: oldData,
            currentData: oldData,
            isFetching,
          },
          serverData,
        ),
        { data: undefined, isLoading: true },
      );
    }
    const response = { data: [{ name: 'Matching result' }] };
    assert.deepEqual(
      catalogueState(request, { originalArgs: request, currentData: response }, serverData),
      {
        data: response,
        isLoading: false,
      },
    );
  }
});

test('a failed matching request cannot resurrect server data as a successful result', () => {
  assert.deepEqual(catalogueState(initial, { originalArgs: initial, isError: true }, serverData), {
    data: undefined,
    isLoading: false,
  });
  assert.deepEqual(catalogueState(initial, { originalArgs: { ...initial, page: 2 } }, serverData), {
    data: serverData,
    isLoading: false,
  });
});
