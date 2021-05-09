## 📑 PROJECT

A webpage that can search OMDB for movies, and allow the user to save their favourite films

https://pikamovie.netlify.app/ (in progress)

---

## ✏️ WIREFRAMING

<p align="center">
  <img src="./public/images/wireframing.png" alt="" width=500>
</p>

---

## 🎨 UI

#### - MAIN

<p align="center">
  <img src="./public/images/main.png" width=1200>
</p>

---

#### - SEARCH

<p align="center">
  <img src="./public/images/search.png" width=700>
</p>

---

#### - MODAL

<p align="center">
  <img src="./public/images/modal-1.png" width=500>
</p>

---

#### - MODAL (custom image for empty posters)

<p align="center">
  <img src="./public/images/modal-2.png" width=500>   
</p>
  
---

## 🔮 FEATURE

- Search OMDB and display the results (Axios)
- Add a movie from the search results to our nomination list
- View the list of films already nominated
- Remove a nominee from the nomination list
- Display a banner when the user has 5 nominations
- Create Sign up / Sign in / Sign out pages (React Router)
- Save nomination lists if the user leaves the page (Firebase)
- Animations for loading, adding/deleting movies, notifications
- Create shareable links (Netlify)

---

## 📎 PLAN

#### STACK

React Hooks, React Router, React Styled Components, Firebase, Cloudinary, Redux, Netlify

---

## 💡 PROBLEM SOLVING RECORD

- [x] The main page is empty ((before the user searches any movie)  
       => Display pre-loaded movie list

- [x] Some movie data has no posters, and N/A values  
       => Replace empty posters with custom poster, and error messages

- [x] Scroll bar relocates the elements  
       => Set width: 100% and margin: auto 0

- [x] Input text limit  
       => Set input maxLength

- [x] heroku error  
       => free deployment limit exceeded  
       => deploy on netlify  
       yarn build  
       netlify deploy  
       netlify deploy --prod

- [x] github push rejected after adding README file on Github  
       => git pull origin master

- [x] how to import images in public folder in react?

      <img src={process.env.PUBLIC_URL + '/yourPathHere.jpg'} />
      <img src={window.location.origin + '/yourPathHere.jpg'} />

- [x] API key privacy issue
      => saved it in .env file

- [x] using multiple dynamic className  
       => [styles.description, styles.hr].join(' ')]  
       => [`${styles, description} ${styles.hr}`]
- [x] how to make tables responsive?  
       => flex: 1 1 70% / flex: 1 1 30% (display: flex, width: 100% for its parents & max-width: fixed value(px) for its grand parents)

- [x] fetch doesn't work on Internet Explorer (MDN Can I Use)  
       => use axios  
       yarn add axios  
       import axios from 'axios';

- [x] react router => SPA + url  
       => yarn add react-router-dom

- [ ] firebase  
       => yarn add firebase

- [ ] yarn add react-router-dom can't import useHistory  
       => install yarn add react-router instead
