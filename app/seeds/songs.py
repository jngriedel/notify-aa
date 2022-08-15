from app.models import db, Song


# Adds a demo user, you can add other users here if you want
def seed_songs():

    #country
    country_1 = Song(
        name='Live Like You Were Dying', artist='Tim McGraw', album='Live Like You Were Dying', genre='Country', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Tim+McGraw+-+Live+Like+You+Were+Dying+(Official+Music+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/livelike+you+were+dying.jpg')
    country_2 = Song(
        name='Jolene', artist='Dolly Parton', album='Jolene', genre='Country', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Dolly+Parton+-+Jolene+(Audio).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Jolene.jpg')
    country_3 = Song(
        name='I Walk the Line', artist='Johnny Cash', album='I Walk the Line', genre='Country', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/I+Walk+the+Line.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/JohnnyCashIWalkTheLine.jpg')
    country_4 = Song(
        name='Friends in Low Places', artist='Garth Brooks', album='No Fences', genre='Country', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Garth+Brooks-+Friends+In+Low+Places.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/garth+brooks.jpg')
    country_5 = Song(
        name='Take Me Home, Country Roads', artist='John Denver', album='Poems, Prayers, & Promises', genre='Country', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/John+Denver+-+Take+Me+Home%2C+Country+Roads+(Audio).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Poems%2C_Prayers_and_Promises.jpg')

    #classical
    classical_1 = Song(
        name='Eine Kleine Nachtmusik', artist='Mozart', album='Eine Kleine Nachtmusik', genre='Classical', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Eine+Kleine+Nachtmusik+-+Mozart.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/eine+kleine.jpg'
    )
    classical_2 = Song(
        name='Für Elise', artist='Beethoven', album='Für Elise', genre='Classical', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Beethoven+-+F%C3%BCr+Elise+(Piano+Version).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/furelise.jpg'
    )
    classical_3 = Song(
        name='Four Seasons', artist='Vivaldi', album='Four Seasons', genre='Classical', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Four+Seasons+_+Vivaldi.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/4seasons.jpg'
    )
    classical_4 = Song(
        name='1812 Overture (Finale)', artist='Tchaikovsky', album='1812 Overture', genre='Classical', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Piotr+Ilich+Tchaikovsky+-+1812+Overture+(Finale).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/1812.jpg'
    )
    classical_5 = Song(
        name='The Blue Danube', artist='Johann Strauss II', album='The Blue Danube', genre='Classical', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/The+Blue+Danube.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/R-7160804-1572820190-7915.jpg'
    )

    #electronic
    electronic_1 = Song(
        name='Clash', artist='Caravan Palace', album='Panic', genre='Electronic', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Caravan+Palace+-+Clash.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Caravan-Palace-Panic.png'
    )
    electronic_2 = Song(
        name='Bangarang', artist='Skrillex', album='Bangarang', genre='Electronic', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Skrillex+-+Bangarang+(Ft.+Sirah)+%5BOfficial+Audio%5D.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/bangarang.jpg'
    )
    electronic_3 = Song(
        name='Sandstorm', artist='Darude', album='Before the Storm', genre='Electronic', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Darude+-+Sandstorm.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Darude_Before_the_Storm.jpg'
    )
    electronic_4 = Song(
        name='Animals', artist='Martin Garrix', album='Animals', genre='Electronic', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Martin+Garrix+-+Animals+(Official+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Martin_Garrix_-_Animals.png'
    )
    electronic_5 = Song(
        name='Lean On', artist='Major Lazer', album='Peace is the Mission', genre='Electronic', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Major+Lazer+%26+DJ+Snake+-+Lean+On+(feat.+M%C3%98)+(Official+Music+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/MajorLazerPeaceIstheMission.png'
    )

    #jazz
    jazz_1 = Song(
        name='Take the A Train', artist='Duke Ellington', album='Take the A Train', genre='Jazz', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Duke+Ellington+-+Take+the+a+train.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/atrain.jpg'
    )
    jazz_2 = Song(
        name='Take Five', artist='Dave Brubeck', album='Take Five', genre='Jazz', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Dave+Brubeck+-+Take+Five.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/take+5.jpg'
    )
    jazz_3 = Song(
        name='Sing Sing Sing', artist='Benny Goodman', album='Sing Sing Sing', genre='Jazz', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/_SING%2C+SING%2C+SING_+BY+BENNY+GOODMAN.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/sing+sing+sing.jpg'
    )
    jazz_4 = Song(
        name='Unforgettable', artist='Nat King Cole and Natalie Cole', album='Unforgettable', genre='Jazz', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Unforgettable+(Duet+with+Nat+King+Cole).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/unforgetabble.jpg'
    )
    jazz_5 = Song(
        name='Fly Me To The Moon', artist='Frank Sinatra', album='In Other Words', genre='Jazz', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Fly+Me+To+The+Moon+(2008+Remastered).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Kaye_Ballard_In_Other_Words_Decca_Records_Inc._Catalog_Number_9_29114_Photographed_15_April_2014.jpg'
    )

    #metal
    metal_1 = Song(
        name='Bad Things', artist='I Prevail', album='True Power', genre='Metal', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/I+Prevail+-+Bad+Things+(Official+Music+Video)+(1).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/515812-true-power.webp'
    )
    metal_2 = Song(
        name='Enter Sandman', artist='Metallica', album='Enter Sandman', genre='Metal', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Metallica_+Enter+Sandman+(Official+Music+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/enter+sandman.jpg'
    )
    metal_3 = Song(
        name='Chop Suey', artist='System of a Down', album='Toxicity', genre='Metal', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/System+Of+A+Down+-+Chop+Suey!+(Official+HD+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/toxcicity.jpg'
    )
    metal_4 = Song(
        name='Immigrant Song', artist='Led Zeppelin', album='Led Zeppelin III', genre='Metal', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Immigrant+Song+(Remaster).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/ledzepplin3.jpg'
    )
    metal_5 = Song(
        name='Crazy Train', artist='Ozzy Osbourne', album='Blizzard of Ozz', genre='Metal', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Ozzy+Osbourne+-+Crazy+Train+(Official+Animated+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/ozzy.jpg'
    )

    #pop
    pop_1 = Song(
        name='Get Lucky', artist='Daft Punk', album='Random Access Memories', genre='Pop', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Daft+Punk+-+Get+Lucky+(Official+Audio)+ft.+Pharrell+Williams%2C+Nile+Rodgers.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/get+lucky.jpg'
    )
    pop_2 = Song(
        name='Take On Me', artist='a-ha', album='Hunting High and Low', genre='Pop', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/a-ha+-+Take+On+Me.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/take+on+me.jpg'
    )
    pop_3 = Song(
        name='Blinding Lights', artist='The Weeknd', album='After Hours', genre='Pop', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/The+Weeknd+-+Blinding+Lights+(Official+Audio).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/after+hours.png'
    )
    pop_4 = Song(
        name='Beat It', artist='Michael Jackson', album='Thriller', genre='Pop', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Michael+Jackson-Beat+it+(Lyrics).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/thriller.png'
    )
    pop_5 = Song(
        name='Shake it Off', artist='Taylor Swift', album='1989', genre='Pop', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Taylor+Swift+-+Shake+It+Off+(Audio).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/1989.jpg'
    )

    #rap
    rap_1 = Song(
        name='No Problem', artist='Chance the Rapper', album='Coloring Book', genre='Rap', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Chance+The+Rapper+-+No+Problem+(feat.+Lil+Wayne+2+Chainz)+Explicit.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/coloring+book.png'
    )
    rap_2 = Song(
        name='Sweatpants', artist='Childish Gambino', album='Because of the Internet', genre='Rap', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/IV.+Sweatpants.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/because+of+the+internet.gif'
    )
    rap_3 = Song(
        name='It Was A Good Day', artist='Ice Cube', album='The Predator', genre='Rap', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/It+Was+A+Good+Day.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/the+pred.jpg'
    )
    rap_4 = Song(
        name='Changes', artist='Tupac', album='Changes', genre='Rap', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Changes.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/changes.jpg'
    )
    rap_5 = Song(
        name='Lose Yourself', artist='Eminem', album='8 Mile Soundtrack', genre='Rap', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Eminem+-+Lose+Yourself+(Lyrics).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/lose+yourself.jpg'
    )

    #rock
    rock_1 = Song(
        name='Ain\'t Talkin\' \'bout Love', artist='Van Halen', album='Van Halen', genre='Rock', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Van+Halen+-+Aint+Talkin\'+Bout+Love.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/vanhalen.jpg'
    )
    rock_2 = Song(
        name='Smells Like Teen Spirit', artist='Nirvana', album='Nevermind', genre='Rock', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Nirvana+-+Smells+Like+Teen+Spirit.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/nevermind.jpg'
    )
    rock_3 = Song(
        name='Thunderstruck', artist='AC/DC', album='The Razor\'s Edge', genre='Rock', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/AC_DC+-+Thunderstruck.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/the+razors+edge.jpg'
    )
    rock_4 = Song(
        name='Welcome to the Jungle', artist='Guns N\' Roses', album='Appetite for Destruction', genre='Rock', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Guns\'n+Roses+-+Welcome+to+the+Jungle.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/appetitefordestruction.jpg'
    )
    rock_5 = Song(
        name='Don\'t Stop Believin\'', artist='Journey', album='Escape', genre='Rock', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Journey+-+Don\'t+Stop+Believin.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/escape.jpg'
    )

    #other
    other_1 = Song(
        name='Welcome To The Black Parade', artist='My Chemical Romance', album='The Black Parade', genre='Other', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/My+Chemical+Romance+-+Welcome+To+The+Black+Parade+(audio).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/black+parade.jpg'
    )
    other_2 = Song(
        name='Where Is My Mind?', artist='Pixies', album='Surfer Rosa', genre='Other', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Where+Is+My+Mind_.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/SurferRosa.jpg'
    )
    other_3 = Song(
        name='This Is How We Do It', artist='Montell Jordan', album='This Is How We Do It', genre='Other', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Montell+Jordan+-+This+Is+How+We+Do+It.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/this+is+how+we+do+it.png'
    )
    other_4 = Song(
        name='Snow (Hey Oh)', artist='Red Hot Chili Peppers', album='Stadium Arcadium', genre='Other', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Red+Hot+Chili+Peppers+-+Snow+(Hey+Oh)+-+Remastered.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/stadiumarcadiam.jpg'
    )
    other_5 = Song(
        name='Feel Good Inc.', artist='Gorillaz', album='Demon Days', genre='Other', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Gorillaz+-+Feel+Good+Inc+HD.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/gorrilaz.jpg'
    )


    #country
    db.session.add(country_1)
    db.session.add(country_2)
    db.session.add(country_3)
    db.session.add(country_4)
    db.session.add(country_5)

    #classical
    db.session.add(classical_1)
    db.session.add(classical_2)
    db.session.add(classical_3)
    db.session.add(classical_4)
    db.session.add(classical_5)

    #electronic
    db.session.add(electronic_1)
    db.session.add(electronic_2)
    db.session.add(electronic_3)
    db.session.add(electronic_4)
    db.session.add(electronic_5)

    #jazz
    db.session.add(jazz_1)
    db.session.add(jazz_2)
    db.session.add(jazz_3)
    db.session.add(jazz_4)
    db.session.add(jazz_5)

    #metal
    db.session.add(metal_1)
    db.session.add(metal_2)
    db.session.add(metal_3)
    db.session.add(metal_4)
    db.session.add(metal_5)

    #pop
    db.session.add(pop_1)
    db.session.add(pop_2)
    db.session.add(pop_3)
    db.session.add(pop_4)
    db.session.add(pop_5)

    #rap
    db.session.add(rap_1)
    db.session.add(rap_2)
    db.session.add(rap_3)
    db.session.add(rap_4)
    db.session.add(rap_5)

    #rock
    db.session.add(rock_1)
    db.session.add(rock_2)
    db.session.add(rock_3)
    db.session.add(rock_4)
    db.session.add(rock_5)

    #other
    db.session.add(other_1)
    db.session.add(other_2)
    db.session.add(other_3)
    db.session.add(other_4)
    db.session.add(other_5)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
