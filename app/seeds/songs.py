from app.models import db, Song


# Adds a demo user, you can add other users here if you want
def seed_songs():

    #country
    country_1 = Song(
        name='Live Like You Were Dying', artist='Tim McGraw', album='Live Like You Were Dying', genre='Country', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Tim+McGraw+-+Live+Like+You+Were+Dying+(Official+Music+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/livelike+you+were+dying.jpg')
    country_2 = Song(
        name='Jolene', artist='Dolly Parton', album='Jolene', genre='Country', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Dolly+Parton+-+Jolene+(Audio).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Jolene_(Dolly_Parton_album_-_cover_art).jpg')
    country_3 = Song(
        name='I Walk the Line', artist='Johnny Cash', album='I Walk the Line', genre='Country', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/I+Walk+the+Line.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/JohnnyCashIWalkTheLine.jpg')
    country_4 = Song(
        name='Friends in Low Places', artist='Garth Brooks', album='No Fences', genre='Country', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Garth+Brooks-+Friends+In+Low+Places.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Garth_Brooks-No_Fences_(album_cover).jpg')
    country_5 = Song(
        name='Take Me Home, Country Roads', artist='John Denver', album='Poems, Prayers, & Promises', genre='Country', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/John+Denver+-+Take+Me+Home%2C+Country+Roads+(Audio).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Poems%2C_Prayers_and_Promises.jpg')

    #classical
    classical_1 = Song(
        name='Eine Kleine Nachtmusik', artist='Mozart', album='Eine Kleine Nachtmusik', genre='Classical', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Eine+Kleine+Nachtmusik+-+Mozart.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Eine_Kleine_Nachtmusik_(album)_cover.jpg'
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
        name='Bangarang', artist='Skrillex', album='Bangarang', genre='Electronic', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Skrillex+-+Bangarang+(Ft.+Sirah)+%5BOfficial+Audio%5D.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Skrillex_-_Bangarang_(EP).png'
    )
    electronic_3 = Song(
        name='Sandstorm', artist='Darude', album='Before the Storm', genre='Electronic', user_id = 2, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Darude+-+Sandstorm.mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Darude_Before_the_Storm.jpg'
    )
    electronic_4 = Song(
        name='Animals', artist='Martin Garrix', album='Animals', genre='Electronic', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Martin+Garrix+-+Animals+(Official+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Martin_Garrix_-_Animals.png'
    )
    electronic_5 = Song(
        name='', artist='', album='Peace is the Mission', genre='Electronic', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Major+Lazer+%26+DJ+Snake+-+Lean+On+(feat.+M%C3%98)+(Official+Music+Video).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/MajorLazerPeaceIstheMission.png'
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
        name='Unforgettable', artist='Nat King Cole and Natalie Cole', album='', genre='Jazz', user_id = 3, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Unforgettable+(Duet+with+Nat+King+Cole).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Natalie_Cole-Unforgettable_With_Love_(album_cover).jpg'
    )
    jazz_5 = Song(
        name='Fly Me To The Moon', artist='Frank Sinatra', album='In Other Words', genre='Jazz', user_id = 1, mp3_url='https://notify-aa.s3.us-west-1.amazonaws.com/Fly+Me+To+The+Moon+(2008+Remastered).mp3', image_url='https://notify-aa.s3.us-west-1.amazonaws.com/Kaye_Ballard_In_Other_Words_Decca_Records_Inc._Catalog_Number_9_29114_Photographed_15_April_2014.jpg'
    )

    #metal
    metal_1 = Song(
        name='Bad Things', artist='I Prevail', album='True Power', genre='Metal', user_id = 1, mp3_url='', image_url=''
    )
    metal_2 = Song(
        name='Enter Sandman', artist='Metallica', album='Enter Sandma', genre='Metal', user_id = 1, mp3_url='', image_url=''
    )
    metal_3 = Song(
        name='', artist='', album='', genre='Metal', user_id = 2, mp3_url='', image_url=''
    )
    metal_4 = Song(
        name='', artist='', album='', genre='Metal', user_id = 3, mp3_url='', image_url=''
    )
    metal_5 = Song(
        name='', artist='', album='', genre='Metal', user_id = 1, mp3_url='', image_url=''
    )

    #pop
    pop_1 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    pop_2 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    pop_3 = Song(
        name='', artist='', album='', genre='', user_id = 2, mp3_url='', image_url=''
    )
    pop_4 = Song(
        name='', artist='', album='', genre='', user_id = 3, mp3_url='', image_url=''
    )
    pop_5 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )

    #rap
    rap_1 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    rap_2 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    rap_3 = Song(
        name='', artist='', album='', genre='', user_id = 2, mp3_url='', image_url=''
    )
    rap_4 = Song(
        name='', artist='', album='', genre='', user_id = 3, mp3_url='', image_url=''
    )
    rap_5 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )

    #rock
    rock_1 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    rock_2 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    rock_3 = Song(
        name='', artist='', album='', genre='', user_id = 2, mp3_url='', image_url=''
    )
    rock_4 = Song(
        name='', artist='', album='', genre='', user_id = 3, mp3_url='', image_url=''
    )
    rock_5 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )

    #other
    other_1 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    other_2 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
    )
    other_3 = Song(
        name='', artist='', album='', genre='', user_id = 2, mp3_url='', image_url=''
    )
    other_4 = Song(
        name='', artist='', album='', genre='', user_id = 3, mp3_url='', image_url=''
    )
    other_5 = Song(
        name='', artist='', album='', genre='', user_id = 1, mp3_url='', image_url=''
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


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
