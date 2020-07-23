var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: screen.height,
    height: screen.height,
    scale: {
        mode: Phaser.Scale.FIT, // we don't want to change pixel size relationships
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    backgroundColor: '#2d2d2d',
    scene: {
        create: create,
        update: update
    },
    //desynchronized: true, // here be dragons (and also only works in chrome)
    stencil: false // presumably this saves us some amount of CPU/GPU?
};

function create ()
{
    this.cameras.main.setBounds(-config.width / 2, -config.height / 2, config.width, config.height);
    graphics = this.add.graphics();
    follower = { t: 0, vec: new Phaser.Math.Vector2() };
    path = new Phaser.Curves.Path(100, 0);
    path.circleTo(100, true);

    this.tweens.add({
        targets: follower,
        t: 1,
        ease: 'Sine.easeInOut',
        duration: 2000,
        yoyo: true,
        repeat: -1
    });

}

function update ()
{
    graphics.clear();
    graphics.lineStyle(2, 0xffffff, 1);

    path.draw(graphics);

    path.getPoint(follower.t, follower.vec);

    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(follower.vec.x, follower.vec.y, 12);
    graphics.fillStyle(0x00ff00, 1);
    graphics.fillCircle(0, 0, 24);
}

var game = new Phaser.Game(config);
