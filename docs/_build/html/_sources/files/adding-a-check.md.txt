This can probably be automated to make it WAY easier.

Anyway, here are the steps.

- Create a check under `src/checker/checks`
    - The name of the class is also the name of the checker so name it well
- Add your check to `src/barrel/checks.ts`
    - All checks live here so we can import them all conveniently
- Import your check in `src/checker/checkFactory.ts`
- Add your check to the `checkMap` in `src/checker/checkFactory.ts`
- Increment the splice last two spliced numbers in `checkerRunner` otherwise it
  will remove the wrong things. Gross I know and needs to be fixed
- Add it to the README.md so people know it's a thing
- Add it to `configuration.md`. This is an exhaustive list of the checks
- Add tests. The name of the test should match the name of the check

## Troubleshooting

### `TypeError: checkMap[check] is not a constructor`

Your check is not being picked up by the `checkerRunner`. log out what the value
of `checks` is in `checkerRunner` **after** the `splice`ing.
