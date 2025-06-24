import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Movies from './components/Movies/Movies'
import MovieDetails from './components/MovieDetails/MovieDetails'
import NotFound from './components/Notfound/NotFound'
import MoviesContextProvider from './context/Movies/MoviesContextProvider'
import Layout from './components/Layout/Layout'
import Watchlist from './components/Watchlist/Watchlist'
import ThemeContextProvider from './context/Theme/ThemeContextProvider'
import Genres from './components/Genres/Genres'
import SelectedGenre from './components/SelectedGenre/SelectedGenre'
import WatchlistContextProvider from './context/Watchlist/WatchlistContextProvider'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import Search from './components/Search/Search'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import Favourites from './components/Favourites/Favourites'


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Movies />,
        },
        {
          path: '/:id',
          element: <MovieDetails />
        },
        {
          path: '/genres',
          element: <Genres />,
        },
        {
          path: '/search',
          element: <Search />,
        },
        { path: '/selected-genre/:genreId', element: <SelectedGenre /> },
        {
          path: '/watchlist',
          element: <Watchlist />
        },
        {
          path: '/favourites',
          element: <Favourites />
        },
        {
          path: '*',
          element: <NotFound />
        },
      ]
    }
  ]
  )
  return (
    <>
      <Provider store={store}>
        <ThemeContextProvider>
          <MoviesContextProvider>
            <WatchlistContextProvider>
              <RouterProvider router={router} />
            </WatchlistContextProvider>
          </MoviesContextProvider>
        </ThemeContextProvider>
      </Provider>

    </>
  )
}

export default App
