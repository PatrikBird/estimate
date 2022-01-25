# Estimate

powered by: 
- Vue
- Vite
- Tailwind
- Daisy UI

## Roadmap
- [x] provide switch to observer/voter via shortcut/click
- [x] implement `reveal vote` and `reset vote`
- [x] fix reactivity issue (probably a timing issue, check firebase docs about `onSnapshot`)
  - [x] remove all related workarounds
  - [x] provide `vote result overview` after they have been revealed
- [ ] vote for a break

## Minor improvements
find ways to improve session management
- [x] use sessionStorage instead of localStorage 
- [x] if user toggles with 'o', reset visuals
- [ ] if user deletes other user, show input modal
- [ ] darkmode toggle
- [ ] show highest and lowest values in overview by separating them visually or pick the names and display them
