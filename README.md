# Estimate

powered by: 
- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Daisy UI](https://daisyui.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Firebase](https://firebase.google.com/)

## Roadmap
- [x] core functionality
- [x] implement vote `?`
- [ ] improve vote result presentation
  - [ ] group identical votes
  - [ ] show average
  - [ ] highlight min and max?
- [ ] support multiple votes simultaneously
  - [ ] landing page to init session
  - [ ] generates id as collection
  - [ ] encode id in route to enable sharing
- [ ] t-shirt sizes as votes
- [ ] vote for a break

### Improvements
- [x] highlight current user in table
- [ ] logout button in navigation
- [ ] reset vote button visuals after revealing votes
- [ ] hide/disable votes for observers
- [ ] UI
  - [ ] darkmode toggle
  - [ ] adjust colors, font
  - [x] center body

#### Known issues
- [ ] if another user deletes you, there's no input modal showing up -> you have to re-open the browser tab or clear session storage
