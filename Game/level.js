class Level{
    static ID = 1
    static BaseLevel(){
        Plosina_2.Setup(Player)
        Plosina_3.Setup(Player)
        Plosina_4.Setup(Player)
        Plosina_5.Setup(Player)
        Plosina_6.Setup(Player)
        Plosina_8.Setup(Player)
        Key_1.KeySetup()
        Key_2.KeySetup()
        Key_3.KeySetup()
        Key_4.KeySetup()
        Key_5.KeySetup()
        Key_6.KeySetup()
        Door_1.DoorSetup()
    }
    static SecondLevel(){

    }
}

function World(){
    if (Level.ID == 1){
        Level.BaseLevel()
    }else{

    }
}

