# NOT-ify #

**Created by:**
- [Josef Niels Griedel](https://github.com/jngriedel) 


**Created using:** 
- ***Python***
- ***Flask***
- ***Javascript***
- ***React***
- ***Redux***
- ***PostgreSQL***
- ***SQLAlchemy***

Welcome to NOT-ify! A spotify clone. Using NOT-ify, users are able to upload their music, listen, and create playlists from their own songs, and others'!

**Give NOT-ify a listen!:** https://notify-app-academy.herokuapp.com/

## **Home** ##
On the splash page, users can click on the login button if they already have an account, or the signup button to create a new account.

![image](https://user-images.githubusercontent.com/19957902/184250057-581dbb48-5125-4816-87e2-bbfe20015132.png)

## **Log In, Sign-Up & Demo User** ##

Users can enter their own information or choose to login as a demo user.

![image](https://user-images.githubusercontent.com/19957902/184250175-d38e22e4-ced0-4991-911e-95472f1f7e47.png)

![image](https://user-images.githubusercontent.com/19957902/184250238-debbd2c4-a48e-4fc0-a730-1e024370eb1e.png)







## **Home** ##
On the home page, users will see thier playlists, and songs sorted by genre. Using the playbutton, they can play a song, or open the dropdown menu to add the song to a playlist or the play queue. 

![image](https://user-images.githubusercontent.com/19957902/184250726-91798990-fcbd-44dd-ad2b-e9d9cb2e8d9d.png)


![image](https://user-images.githubusercontent.com/19957902/184250823-621cd55e-4fa4-480e-8999-924c496ec188.png)



## **Navbar** ##
While logged in, the user can see the Navbar on all pages. This navbar can be used to direct the user home, go to the search page, create a playlist, or upload a song. The user can also access all of their playlists from the scrollable menu.

## **Upload Song** ##
When clicking the upload song button, users will enter a song name, artist, album name, optional album art, and an mp3 file. 

![image](https://user-images.githubusercontent.com/19957902/184253594-1b57be6b-5665-4ef5-9b9c-ccd68f3410f6.png)

## **Create a Playlist** ##
When clicking create playlist button, users can enter a playlist name, an optional description, and an optional playlist image.

![image](https://user-images.githubusercontent.com/19957902/184253674-dbaa9b32-a505-4c15-ad95-146390e40bfd.png)



## **Search** ##
The search page allows a user to filter through the database of songs and find songs or artists that relate to they key terms. Users can then add songs to the play queue or to a playlist.

![image](https://user-images.githubusercontent.com/19957902/184251394-9d9348d9-bf57-48c8-980c-78615d6810aa.png)

## **Playlist** ##
On a playlist page, users can play all songs in the playlist by clicking the green play button, or look through songs individually, play them, add them to the play queue or other playlists, remove them from the playlist, and even edit and delete them if they are the song owner. 

![image](https://user-images.githubusercontent.com/19957902/184253962-a1614aa8-165e-4cb3-85c5-26b1990d5284.png)

When clicking on the playlist image, users can edit the playlist name, description, image, or delete the playlist. 

![image](https://user-images.githubusercontent.com/19957902/184254040-dd3482dd-9dd7-4bf2-b505-8a0beb5bd179.png)


## **Profile** ##
When clicking the profile dropdown at the top of the screen, they can access thier profile page. 
![image](https://user-images.githubusercontent.com/19957902/184251659-825859e1-8a1c-476f-85b3-cc25d08fc512.png)


On the profile page, a user will see all of their playlists and uploaded songs. They can navigate to the playlists, or edit and delete their songs. 

![image](https://user-images.githubusercontent.com/19957902/184253005-12d4fdfb-c2c6-4a35-82bd-3a698817ec43.png)

![image](https://user-images.githubusercontent.com/19957902/184253056-e85b1ab6-a4d0-460f-b6cf-4ba45786cdc0.png)


When clicking on the profile picture, a user can edit their username and profile picture.

![image](https://user-images.githubusercontent.com/19957902/184253305-e03013d9-f6ec-4ffa-bd68-a6c4d5863a7c.png)

## **Music Player** ##
The music player is intuitive, with play next and previous buttons. The queue of songs can be seen by clicking the far right queue button

![image](https://user-images.githubusercontent.com/19957902/184255464-3efbf897-8a06-4bb9-86a3-b7f04dce7429.png)


## **Code Snippet** ##
To show the users playlists in the ellipse dropdown menu a onMouseEnter and onMouseLeave property was used. The playists will appear when hovering the Add to playlist option, and they will remain open so long as the mouse doesn't leave their dropdown, or the original Add to playlist element. 

```
{playlistId && <li
              style={{ visibility: sessionUser.id === song.user_id ? 'visible' : 'hidden' }}
              onClick={handleRemoveFromPlaylist} >Remove from playlist</li>}
              <li
                onMouseEnter={() => setShowPlaylists(true)}
                onMouseLeave={() => setShowPlaylists(false)}>
                Add to Playlist <img className='triangle-songoptions' alt='triangle' src={triangle_right} /></li>
            </ul>

            {showPlaylists &&
              <ul onMouseEnter={() => setShowPlaylists(true)} className='playlist-dropdown'>
                {Object.values(playlists).map((playlist, i) => (
                  <li key={i} onClick={() => handleAddToPlaylist(playlist.id)} className='playlist-dropdown-option'>
                    {playlist.name}
                  </li>
                ))}

              </ul>
```



# How to Install Locally 

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on alpine-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

### Dev Containers (OPTIONAL for M1 Users)
The following instructions detail an *optional* development setup for M1 Mac users having issues with the `psycopg` package.

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. You do not need a `DATABASE_URL` in the `.env` file if you are using this Docker setup for development - the URL is already set in the image (see `.devcontainer/Dockerfile` for the URL).

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.



