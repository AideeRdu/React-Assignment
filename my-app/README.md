TVmaze Show Gallery (React)

A React single-page app, built with Vite, for searching TV shows with the
[TVmaze API](https://www.tvmaze.com/api). It has a searchable gallery at `/`
and a show detail page at `/shows/:id`. This is a rebuild of my earlier vanilla
JavaScript version.

#How to run the project:
```bash
npm install
npm run dev


Then open the local URL that Vite prints ( http://localhost:5173).

#Concepts and Files
1* Components and props  `src/components/*.jsx` (App.jsx passes props to GalleryPage, ShowList, ShowCard, CastList, etc.) 
2* Lists and keys  `src/components/ShowList.jsx` (key = show ID), `src/components/CastList.jsx` (key = person ID + character ID) 
3* Conditional rendering  `src/components/GalleryPage.jsx` (loading, error, empty, no results, results), `src/components/ShowDetail.jsx` 
4*  Controlled form  `src/components/SearchForm.jsx` 
5* State  `src/App.jsx` (query, shows, status, error), `src/components/SearchForm.jsx` (input text) 
6* Effects and fetch  `src/App.jsx` (default and new searches), `src/components/ShowCard.jsx` (cast), `src/components/ShowDetail.jsx`, `src/utils.js` (`fetchJson` checks `res.ok`) 
7* Lifted state `src/App.jsx` owns the search state; `SearchForm` changes it and `ResultsSummary.jsx` displays the count and term 
8* Routing  `src/main.jsx` (BrowserRouter), `src/App.jsx` (Routes), `ShowCard.jsx` (Link), `ShowDetail.jsx` (useParams) 



#Reflection
Learning vanilla JavaScript first was a good introduction to building apps, because it taught me how to write the logic behind a website. React felt more complicated at first, but it was a good step up from JavaScript. Once I understood it, I found it more organized. Instead of building every element by hand with createElement() and updating the page myself, I describe what each piece should look like and React re-renders it when the data changes. Splitting the app into components like SearchForm, ShowCard, and CastList made the code easier to read, and starting from a Vite template gave me a foundation to build on. The harder parts were understanding useEffect and its dependency array, and routing between pages.
State lives in App.jsx, the common parent of the search form and the results. It holds the query, the results, and the request status, so the form, the result count, and the gallery stay in sync and the results survive when I open a detail page and go back. Each ShowCard keeps its own cast state because only that card needs it.## AI use
#Integrity
I used Claude to generate the starting code for this project (the components, routing, and helper functions) based on the assignment instructions. I set up the Vite project, installed the dependencies, fixed setup errors, tested the app, and read through the code to understand how it works.
