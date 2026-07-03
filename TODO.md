heres an ai written thing for ya on how to imploment that shitty unification of both editor frontend for ya
## OpenPress: Unified Component Registry Migration

- [ ] Update `@/components/editor/registry.ts` to map a single multi-mode `component` property per block type instead of split editor/render definitions.
- [ ] Add an optional `preview?: boolean` flag to the component type definition inside the registry item interface.
- [ ] Refactor the static frontend routing file (`app/[slug]/page.tsx`) to dynamically map blocks by reading directly from the unified `registry` dictionary, eliminating hardcoded switch/case blocks.
- [ ] Pass `preview={true}` to components inside `app/[slug]/page.tsx` so they know to hide inputs/textareas and render only pure layout outputs.
- [ ] Update existing core blocks (like `Text.tsx`) to check for the `preview` flag and return early with clean, front-facing markdown markup when active.