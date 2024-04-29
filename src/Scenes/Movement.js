
class Movement extends Phaser.Scene {
    // Class variable definitions -- these are all "undefined" to start

    
    constructor(){

        super("sceneName");
        
        this.my = {sprite: {}};

        //Create constants for the character location
        this.bodyX = 500;
        this.bodyY = 450;

    }

    preload() {

        this.load.setPath("./assets/");
        
        //loading assets
        this.load.image("greenLaser", "laserBlue12.png");
        this.load.image("enemyShip", "playership1_blue.png");       // spaceship that runs along the path


    }

    create() {

        let my = this.my;

        //keys
        this.aKey = this.input.keyboard.addKey('A');
        this.dKey = this.input.keyboard.addKey('D');
        this.spaceKey = this.input.keyboard.addKey('SPACE') ;

        my.sprite.character = this.add.sprite(this.bodyX + 50, this.bodyY + 300, "enemyShip");
        // my.sprite.character.flipY = true;

        //my.sprite.laser = this.add.sprite(this.bodyX , this.bodyY , "greenLaser");  
        this.projectiles = []; // Initialize the projectiles array

    }

    // Draws an x mark at every point along the spline.
    

    update() {
        let my = this.my;

        if (this.aKey.isDown) {
            my.sprite.character.x -= 5;
        }

        if (this.dKey.isDown) {
            my.sprite.character.x += 5;
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            console.log("Space key pressed!");

            let projectile = this.add.sprite(my.sprite.character.x, my.sprite.character.y - 50, "greenLaser");
            //this.projectiles.push(projectile); 

            this.time.addEvent({
                delay: 50,
                callback: () => {
                    projectile.y -= 60 ;  // Increasing the step size
                },
                repeat: 50  // Adjusted to ensure it covers the distance to the top
            });
            

            //destroy projectiles
            this.time.delayedCall(1000, () => {
                projectile.destroy();
            });

        }
    }
}