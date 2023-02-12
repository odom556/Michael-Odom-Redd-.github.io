// QuantaGuard

var main = function(){
    smooth();
    
    //Code
    //{
    
    //Standards
    //{
    noStroke();
    textAlign(CENTER, CENTER);
    
    var username = [];
    
    var buttons = [[150, 150, 100, 100], [85, 150, 50, 100], [150, 265, 100, 50], [265, 150, 50, 100]];
    var menuScenes = [true, false, false, false];
    var transition = [0];
    var bgcolor = color(220, 200, 180);
    
    var CG = createFont("century gothic"), W = color(255);
    var verify = 0, time = 0;
    var Text = function(message, x, y, s, fonts, colored){
        textFont(fonts, s);
        fill(colored);
        text(message, x, y);
    };
    //}
    
    //bg_image
    //{
    var bg_image;
    background(0, 0);
    for(var i=0; i<8; i++){
        for(var j=0; j<8; j++){
            if((i+j)%2===0){
                fill(50, 0, 20);
            }
            else{
                fill(180, 180, 180);
            }
            rect(i*40+40, j*40+40, 40, 40);    
            fill(0, 20);
            triangle(i*40+80, j*40+80, i*40+80, j*40+40, i*40+40, j*40+80);
            fill(255, 25);
            arc(i*40+40, j*40+40, 80, 80, 360, 450);
        }
    }
    bg_image = get (40, 40, width-40, height-40);
    //}
    
    //Arrays Stuff
    //{
    var achievements = [
        ["Getting Started", "You just finished the tutorial.", false, 0], 
        ["First Kill", "You just killed a guy.", false, 0],
        ["Resurrection", "You've just died at least once.", false, 0],
        ["I'm Surfing Waves", "You've just survived your first wave.", false, 0],
        ["Becoming Bill Gates", "You just earned $100,000.", false, 0],
        ["Millionaire", "You just earned your first million.", false, 0],
        ["Unlock the Wall", "You've just unlocked a new weapon.", false, 0],
        ["Unlock the Knight", "You've just unlocked a new weapon.", false, 0],
        ["Unlock the Sorcerer", "You've just unlocked a new weapon.", false, 0],
        ["Unlock the AutoGun", "You've just unlocked a new weapon.", false, 0],
        ["Unlock the Bomb", "You've just unlocked a new weapon.", false, 0],
        ["Unlock the Bouncer", "You've just unlocked a new weapon.", false, 0],
        ["Fully Upgrade the Archer", "You've just fully upgraded a weapon.", false, 0],
        ["Fully Upgrade the Wall", "You've just fully upgraded a weapon.", false, 0],
        ["Fully Upgrade the Knight", "You've just fully upgraded a weapon.", false, 0],
        ["Fully Upgrade the Sorcerer", "You've just fully upgraded a weapon.", false, 0],
        ["Fully Upgrade the AutoGun", "You've just fully upgraded a weapon.", false, 0],
        ["Fully Upgrade the Bomb", "You've just fully upgraded a weapon.", false, 0],
        ["Fully Upgrade the Bouncer", "You've just fully upgraded a weapon.", false, 0],
        
    ];
    var tutorial = [
        ["You will see your money here", [340, 20]],
        ["Click \"Weapon\" to view your weapons", [50, 380]],
        ["For now you only have one weapon, but you will unlock more as you proceed with the game", [0, 0]],
        ["Click a weapon to see its types", [32.5, 375]],
        ["All weapons have five types, each one stronger than the previous", [0, 0]],
        ["You can buy a type if it says \"Buy?\", provided you have enough money", [0, 0]],
        ["Click the \"Buy?\" here", [92.5, 377.5]],
        ["To use a weapon on the board, click on it to select it", [92.5, 377.5]],
        ["Then click anywhere on the board to place it", [60, 300]],
        ["Click this arrow to go back to the main weapons page", [0, 380]],
        ["And click this arrow to go back to the main page", [200, 350]],
        ["Enemies will be coming from the right, and your goal is to NOT let them get to the leftmost side of the board", [0, 0]],
        ["That's it! Good luck :)", [0, 0]],
        ["", [0, 0]]
    ], curTut = true;
    var moneyMakers = [
        ["Amount", "Per Kill", 0, 50, 500, ["Upgrade the amount you", " get by killing."]],
        ["Amount", "Per Second", 0, 1, 100, ["Upgrade the amount you", " earn at any given", " time."]],
        ["Bonus", "Per Wave", 0, 500, 500, ["Upgrade the amount you", " receive at the end", " of each wave."]]
    ];
    //}
    
    //Game Settings
    //{
    var money = 2000, moneyCounter = 0;
    
    var waveSize = 25, curSize = 0, waveCount = [0, 0];
    var selected=0, selStrength = 0;
    var colors = [color(205, 50, 50), color (50, 155, 50), color (50, 50, 200), color (200, 50, 100), color (255, 255, 255)];
    
    var restart = false;
    
    var bounceSpeed = 4, bounceSize = 2;
    var grid = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
    ];
    
    var gameOver = false;
    //}
    
    //Enemies object
    //{
    var Enemy_Bank = ["", "", "", "", "", ""];
    var enemyTime = 800;
    var presence = [0, 0, 0, 0, 0, 0, 0, 0];
    var DestPart = function(pos, vel, maxi, side, hmmm, message){
        this.pos = pos;
        this.vel = vel;
        this.maxi = maxi;
        this.s = random()*10;
        this.life = 50+random()*50;
        this.side = side;
        this.hmmm = hmmm;
        this.message = message;
    };
    DestPart.prototype.draw = function() {
        if(this.message===undefined){
            this.pos.add(this.vel);
            fill(this.side, this.life*5);
            ellipse(this.pos.x, this.pos.y, this.s*this.life/(this.life+3), this.s*this.life/(this.life+3));
            fill(0, this.life*4);
            ellipse(this.pos.x, this.maxi+2.5, this.s*this.life/(this.life+3), 5);
            this.vel.y+=0.15;
            if(this.pos.y>this.maxi){
                this.vel.y*=-0.85;    
            }
            this.life--;
            if(gameOver||restart){
                if(round(this.vel.y)===0){
                    this.pos.x-=(this.pos.x-200)/10;
                    this.pos.y-=(this.pos.y-200)/10;
                    this.vel.y=-0.1;
                    this.vel.x=0;
                }
            }
            if(this.hmmm===0){
                if(this.pos.x>width||this.pos.x<0){
                    this.vel.x*=-1;    
                }
                if(this.pos.y<0){
                    this.vel.y*=-0.85;    
                }
                this.s*=1.1;
            }
        }
        else{
            this.life--;
            fill(255, this.life*4);
            textFont(CG, 15);
            text(this.message, this.pos.x, this.pos.y);
            this.pos.y-=0.2;
        }
    };
    var destparts = [];
    
    var enemies = [];
    var Enemy = function(type, pos, life){
        this.type = type;
        this.life = life;
        this.origlife = this.life;
        this.pos = pos;
        this.bounce = 0;
        this.time=0;
    };
    Enemy.prototype.draw = function() {
        this.time++;
        pushMatrix();
            translate(this.pos.x, this.pos.y+sin(this.bounce*4)*2);
            scale(constrain(this.bounce/(this.bounce-10), 0, 1));
            for(var j=0; j<5; j++){
                if(this.pos.x<120){
                    fill(255, 255-sin(this.bounce*5)*200, 255-sin(this.bounce*5)*200, j*20);
                }
                else{
                    fill(255, 255, 255, j*20);
                }
                ellipse(0, 0, 20+j*5, 20+j*5);    
            }
            switch(this.type){
                case 3:
                    fill(0);
                    rect(-15, -15, 30, 30);
                    this.pos.x-=bounceSpeed/10;
                break;
                case 4:
                    fill(0);
                    ellipse(0, 0, 15, 15);
                    for(var i=0; i<(this.type*2); i++){
                        pushMatrix();
                            rotate(i*360/(this.type*2)+this.bounce);
                            ellipse(0, -12, 6, 6);
                        popMatrix();
                    }
                    this.pos.x-=bounceSpeed/40;
                    if(this.life<=0){
                        for(var i=0; i<5; i++){
                            enemies.push(new Enemy(5, new PVector(this.pos.x-i*10, this.pos.y), 200));    
                        }
                    }
                break;
                case 5:
                    fill(0);
                    ellipse(0, 0, 15, 15);
                    this.pos.x-=bounceSpeed/5;
                break;
                case 6:
                    fill(0);
                    ellipse(0, 0, 40, 40);
                    this.pos.x-=bounceSpeed/20;
                break;
                case 7:
                    fill(0);
                    triangle(-10, 5, 10, 5, 0, -10);
                    this.pos.x-=bounceSpeed/30;
                    if(round(this.time)%50===1){
                        enemies.push(new Enemy(5, new PVector(this.pos.x, this.pos.y), 200));
                    }
                break;
                default:
                    fill(0);
                    ellipse(0, 0, 20, 20);
                    for(var i=0; i<(this.type*2+3); i++){
                        pushMatrix();
                            rotate(i*360/(this.type*2+3)+this.bounce);
                            triangle(-5, -12, 5, -12, 0, -18);
                        popMatrix();
                    }
                    this.pos.x-=bounceSpeed/40;
                break;
            }
        popMatrix();
        pushMatrix();
            translate(this.pos.x, this.pos.y);
            fill(255, 50, 150, 150);
            arc(0, sin(this.bounce*4)*2, 10, 10, 630-this.life/this.origlife*360, 630);
        popMatrix();
        fill(0, 150);
        ellipse(this.pos.x, this.pos.y+20, 30, 5);
        if(this.life>0){
            this.bounce-=bounceSpeed/2;
        }
        else{
            for(var i=0; i<15; i++){
                destparts.push(new DestPart(new PVector(this.pos.x, this.pos.y), new PVector(random(-1, 1)*2, random(-1, 1)*2), this.pos.y+20, color(0)));
            }
            destparts.push(new DestPart(new PVector(this.pos.x, this.pos.y), new PVector(0, 0), this.pos.y+20, color(0), 1, "+$"+round(moneyMakers[0][3]+this.origlife-200)));
            this.bounce=0;
        }
        if(this.pos.x<20){
            gameOver=true;    
            achievements[2][2]=true;
        }
    };
    //}
    
    //Bullets object
    //{
    var Bullet = function(type, pos, damage){
        this.type = type;
        this.pos = pos;
        this.vel = new PVector(bounceSpeed, 0);
        this.damage = damage*5+10+type*3;
        this.bounce = 0;
        this.trail = [];
        this.alive = true;
    };
    Bullet.prototype.draw = function() {
        switch(this.type){
            case 0:
                if(this.alive){
                    this.trail.push([this.pos.x, this.pos.y+sin(this.bounce+180)*5]);
                }
                pushMatrix();
                    translate(this.pos.x, this.pos.y+sin(this.bounce+180)*5);
                    rotate(sin(this.bounce)*10);
                    scale(constrain(this.bounce/150, 0, 1));
                    fill(255);
                    rect(-5, -2, 15, 4);
                    triangle(10, -4, 10, 4, 15, 0);
                popMatrix();
                this.bounce+=bounceSpeed*2;
                fill(0, 150);
                ellipse(this.pos.x+5, this.pos.y+20, 20, 5);
                for(var i=1; i<this.trail.length; i++){
                    stroke(255, 200, 100, constrain(this.bounce/150, 0, 1)*100);
                    strokeWeight(i*4/5);
                    line(this.trail[i][0], this.trail[i][1], this.trail[i-1][0], this.trail[i-1][1]);
                    noStroke();
                }
            break;
            case 1:
                if(this.alive){
                    this.trail.push([this.pos.x, this.pos.y+sin(this.bounce*3+180)*3]);
                }
                for(var i=1; i<this.trail.length; i++){
                    stroke(255, 255, 255);
                    strokeWeight(i*constrain(this.bounce/150, 0, 1)*5/this.trail.length);
                    line(this.trail[i][0], this.trail[i][1], this.trail[i-1][0], this.trail[i-1][1]);
                    noStroke();
                }
                this.bounce+=bounceSpeed*2;
            break;
            case 2:
                if(this.alive){
                    this.trail.push([this.pos.x, this.pos.y]);
                }
                for(var i=1; i<this.trail.length; i++){
                    stroke(255, 200, 100, constrain(this.bounce/150, 0, 1)*100);
                    strokeWeight(i);
                    line(this.trail[i][0], this.trail[i][1], this.trail[i-1][0], this.trail[i-1][1]);
                    noStroke();
                }
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    scale(constrain(this.bounce/150, 0, 1));
                    fill(255, 255, 255);
                    ellipse(0, 0, 10, 10);
                popMatrix();
                fill(0, 150);
                ellipse(this.pos.x, this.pos.y+30, 10, 5);
                this.bounce+=bounceSpeed*2;
            break;
            case 3:
                if(this.alive){
                    this.trail.push([this.pos.x, this.pos.y]);
                }
                for(var i=1; i<this.trail.length; i++){
                    stroke(155, 205, 255);
                    strokeWeight(i);
                    line(this.trail[i][0], this.trail[i][1], this.trail[i-1][0], this.trail[i-1][1]);
                    noStroke();
                }
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    scale(constrain(this.bounce/150, 0, 1)-this.bounce/1500);
                    fill(55, 155, 255);
                    ellipse(0, 0, 8, 8);
                popMatrix();
                fill(0, 150);
                ellipse(this.pos.x, this.pos.y+30, 10, 5);
                this.bounce+=bounceSpeed;
                if(this.pos.x<40){
                    this.vel.x*=-1;    
                }
                if(this.pos.y<40||this.pos.y>360){
                    this.vel.y*=-1;    
                }
                if(this.bounce>1500){
                    this.pos.x=1000;    
                }
            break;
            case 3:
                
            break;
        }
        this.pos.add(this.vel);
        if((this.trail.length>8&&this.type!==1)||(this.trail.length>20)||!this.alive){
            this.trail.splice(0, 1);    
        }
        if(this.pos.x>width){
            this.alive=false;    
        }
        for(var i=0; i<enemies.length; i++){
            if(dist(enemies[i].pos.x, enemies[i].pos.y, this.pos.x, this.pos.y)<=20){
                if(this.type!==3){
                    if(this.alive){
                        enemies[i].life-=this.damage;    
                    }
                    this.alive=false;
                }
                else{
                    if(this.alive){
                        enemies[i].life-=this.damage/3;    
                        this.vel.x = random()*-3;
                        this.vel.y = random(-1, 1)*3;
                    }
                }
            }
        }
    };
    var bullets = [];
    //}
    
    //Weapons object
    //{
    var Weapon_Bank = [
        ["Archer", 0, 50, [400, 400], ["Shoots arrows at enemies."]],
        ["Wall", 0, 100, [400, 400], ["Blocks the progress of", " enemies."]],
        ["Knight", 0, 100, [400, 400], ["Charges and pushes", " back enemies."]],
        ["Sorcerer", 0, 200, [400, 400], ["Shoots mystic bullets at", " enemies, stronger than an", " archer."]],
        ["AutoGun", 0, 250, [400, 400], ["Shoots strong bullets at", "enemies, stronger than a", "sorcerer."]],
        ["Bomb", 0, 2000, [400, 400], ["Explodes and kills enemies", " within its range."]],
        ["Bouncer", 0, 500, [400, 400], ["Shoots bouncing bullets", " that affect multiple", " enemies."]],
    ], all = true, unlockt = 0;
    var Weapon = function(weapon, type, pos){
        this.weapon = weapon;
        this.type = type;
        if(weapon!==1&&weapon!==2){
            this.life = 100+(type/4)*100;
        }
        else{
            this.life = 1000+(type/4)*1000;    
        }
        this.origlife = this.life;
        this.pos = pos;
        this.bounce = random()*360;
        this.time = 0;
        this.extraSpace = 0;
    };
    Weapon.prototype.draw = function() {
        switch(this.weapon){
            case 0: //Archer
                if(this.time%(100-this.type/5*100)===0&&presence[this.pos.y/40-1]===1){
                    bullets.push(new Bullet(0, new PVector(this.pos.x, this.pos.y+sin(this.bounce)*bounceSize), this.type));    
                }
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    pushMatrix();
                        translate(0, sin(this.bounce)*bounceSize);
                        fill(colors[this.type]);
                        triangle(20, -15, 5, 10, 35, 10);
                        fill(0, 50);
                        triangle(5, 10, 35, 10, 30, 0);
                    popMatrix();
                popMatrix();
            break;
            case 1: //Wall
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    pushMatrix();
                        translate(0, sin(this.bounce)*bounceSize);
                        fill(colors[this.type]);
                        rect(5, -15, 30, 25);
                        fill(0, 50);
                        triangle(5, 10, 35, 10, 35, 0);
                    popMatrix();
                popMatrix();
            break;
            case 2: //Knight 
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    pushMatrix();
                        translate(0, sin(this.bounce)*bounceSize);
                        fill(colors[this.type]);
                        triangle(20, 10, 5, -15, 35, -15);
                        triangle(20, -15, 5, 10, 35, 10);
                        fill(0, 50);
                        triangle(5, 10, 35, 10, 30, 0);
                    popMatrix();
                popMatrix();
                this.pos.x+=bounceSpeed/8;
                if(this.pos.x>width){
                    this.life=0;    
                }
            break;
            case 3: //Sorcerer
                if(this.time%(100-this.type/5*100)===0&&presence[this.pos.y/40-1]===1){
                    bullets.push(new Bullet(1, new PVector(this.pos.x, this.pos.y-10+sin(this.bounce)*bounceSize), this.type));    
                }
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    pushMatrix();
                        translate(0, sin(this.bounce)*bounceSize);
                        fill(colors[this.type]);
                        triangle(20, -15, 10, 1, 30, 1);
                        arc(20, 0, 20, 20, 0, 180);
                        fill(0, 50);
                        triangle(10, 0, 30, 0, 26, -5);
                        arc(20, 0, 20, 20, 0, 180);
                    popMatrix();
                popMatrix();
            break;
            case 4: //Autogun
                if(this.time%(100-this.type/5*100)===0&&presence[this.pos.y/40-1]===1){
                    bullets.push(new Bullet(2, new PVector(this.pos.x, this.pos.y-10+sin(this.bounce)*bounceSize), this.type));    
                }
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    pushMatrix();
                        translate(0, sin(this.bounce)*bounceSize);
                        fill(colors[this.type]);
                        triangle(5, -15, 5, 10, 35, -5); 
                        rect(5, -15, 30, 10); 
                        fill(0, 50);
                        triangle(5, 10, 35, -5, 35, -15);
                    popMatrix();
                popMatrix();
            break;
            case 5: //Bomb
                pushMatrix();
                    translate(this.pos.x, this.pos.y);
                    if(this.life<=30){
                        for(var i=0; i<5; i++){
                            fill(155, 155, 255, 40);
                            ellipse(20, 0, this.extraSpace*i/5*2.5, this.extraSpace*i/5*2.5);                       }
                        if(this.life<=10){
                            for(var i=0; i<enemies.length; i++){
                                if(dist(enemies[i].pos.x, enemies[i].pos.y, this.pos.x+20, this.pos.y)<=30*this.type+60){
                                    enemies[i].life-=200;    
                                }
                            }
                            for(var i=0; i<15; i++){
                                destparts.push(new DestPart(new PVector(this.pos.x+20, this.pos.y), new PVector(random(-1, 1)*2, random(-1, 1)*5), this.pos.y+20, colors[this.type]));
                            }
                        }
                        this.extraSpace-=(this.extraSpace-30*this.type-60)/10;
                    }
                    pushMatrix();
                        translate(0, sin(this.bounce)*bounceSize);
                        fill(colors[this.type]);
                        ellipse(20, 0, 20, 20);
                    popMatrix();
                    this.life--;
                popMatrix();
            break;
            case 6:
                if(this.time%(100-this.type/5*100)===0&&presence[this.pos.y/40-1]===1){
                    bullets.push(new Bullet(3, new PVector(this.pos.x, this.pos.y-10+sin(this.bounce)*bounceSize), this.type));    
                }
                pushMatrix();
                    translate(this.pos.x, this.pos.y+sin(this.bounce)*bounceSize);
                    fill(colors[this.type]);
                    triangle(5, 6, 35, 6, 20, -10);
                    triangle(5, 5, 35, 5, 20, 10);
                popMatrix();
            break;
        }
        pushMatrix();
            translate(this.pos.x, this.pos.y);
            fill(0, 150);
            ellipse(20, 20, 30+sin(this.bounce)*bounceSize/2, 5);
            fill(50, 255, 150, 150);
            arc(20, sin(this.bounce)*bounceSize, 10, 10, 630-this.life/this.origlife*360, 630);
        popMatrix();
        this.time++;
        this.bounce+=bounceSpeed;
        for(var i=0; i<enemies.length; i++){
            if(dist(enemies[i].pos.x, enemies[i].pos.y, this.pos.x, this.pos.y)<=50&&this.pos.y===enemies[i].pos.y&&enemies[i].pos.x>this.pos.x+20){
                enemies[i].pos.x+=1;
                if(round(dist(enemies[i].pos.x, enemies[i].pos.y, this.pos.x, this.pos.y))>=49&&this.weapon!==5){
                    this.life-=5;
                    if(this.weapon===2){
                        enemies[i].life-=2+this.type/2;    
                    }
                }
            }
        }
        if(grid[this.pos.y/40-1][this.pos.x/40-1]===0&&this.weapon!==2){
            this.life=0;
        }
    };
    var weapons = [];
    var Shovel = function(){
        this.activate = false;
        this.pos = new PVector(0, 0);
    };
    Shovel.prototype.draw = function() {
        if(this.activate){
            this.pos.x=mouseX;
            this.pos.y=mouseY;
            if(mouseX>40&&mouseX<360&&mouseY>40&&mouseY<360){
                fill(0, 0, 0, 100);
                rect(round(mouseX/40-0.5)*40, 40, 40, 320);
                rect(40, round(mouseY/40-0.5)*40, 320, 40);
                if(mouseIsPressed){
                    this.activate=false;
                    grid[round(mouseY/40-1.5)][round(mouseX/40-1.5)]=0;
                }
            }
        }
        else{
            this.pos.x=377.5;
            this.pos.y=372.5;
        }
        noFill();
        stroke(225, 50, 70);
        strokeWeight(3);
        ellipse(this.pos.x, this.pos.y, 15, 15);
        noStroke();
        pushMatrix();
            translate(this.pos.x, this.pos.y);
            rotate(-45);
            fill(225, 50, 70);
            rect(-7.5, -1, 15, 2, 10);
        popMatrix();
    };
    var shovel = new Shovel();
    //}
    
    //toolBar function
    //{
    var tools = ["Weapons", "$-Makers", "Settings", ""];
    var heights = [0, 100, 100, 100, 100], aHeights = [0, 100, 100, 100, 100];
    var difference = 0;
    var toolBar = function(){
        Text("$"+round(moneyCounter), 340, 20, 20, CG, W);
        if(difference>1){
            Text("+$"+round(difference), 370, 35, 14, CG, color(255, difference*20));
        }
        difference=round(money-moneyCounter);
        pushMatrix();
            translate(0, aHeights[0]);
            fill(100, 100, 100);
            rect(0, 360, width, 40);
            for(var i=0; i<tools.length; i++){
                fill(0, 0, 0, 100);
                rect(i*100+5, 365, 90, 30);
                if(mouseX>i*100&&mouseX<i*100+100&&mouseY>360&&heights[0]===0){
                    fill(255, 255, 255, 50);
                    rect(i*100, 360, 100, 40);
                    fill(0, 50);
                    triangle(i*100+10, 390, i*100+90, 390, i*100+50, 370);
                    fill(255, 255, 255, 25);
                    triangle(i*100+20, 390, i*100+80, 390, i*100+50, 375);
                    if(mouseIsPressed){
                        heights[0]=100;
                        heights[i+1]=0;
                    }
                }
                Text(tools[i], 50+100*i, 380, 16, CG, W);
            }
            for(var i=0; i<heights.length; i++){
                aHeights[i]-=(aHeights[i]-heights[i])/10;    
            }
        popMatrix();
        pushMatrix();
            translate(0, aHeights[1]);
            fill(100, 100, 100, 200);
            rect(0, 340, width, 60);
            Text("Weapons", 40, 350, 13, CG, W);
            for(var i=0; i<Weapon_Bank.length; i++){
                fill(0, 0, 0, 200);
                rect(i*50+10, 360, 45, 35);
                Text(Weapon_Bank[i][0], i*50+65/2, 388, 9, CG, W);
                fill(colors[Weapon_Bank[i][1]]);
                pushMatrix();
                    translate(i*50+19, 372.5);
                    scale(0.7);
                    switch(i){
                        case 0:
                            triangle(20, -15, 5, 10, 35, 10);
                            fill(0, 50);
                            triangle(5, 10, 35, 10, 30, 0);
                        break;
                        case 1:
                            rect(5, -15, 30, 25);
                            fill(0, 50);
                            triangle(5, 10, 35, 10, 35, 0);
                        break;
                        case 2:
                            triangle(20, 10, 5, -15, 35, -15);
                            triangle(20, -15, 5, 10, 35, 10);
                            fill(0, 50);
                            triangle(5, 10, 35, 10, 30, 0);
                        break;
                        case 3:
                            triangle(20, -15, 10, 1, 30, 1);
                            arc(20, 0, 20, 20, 0, 180);
                            fill(0, 50);
                            triangle(10, 0, 30, 0, 26, -5);
                            arc(20, 0, 20, 20, 0, 180);
                        break;
                        case 4:
                            triangle(5, -15, 5, 10, 35, -5); 
                            rect(5, -15, 30, 10); 
                            fill(0, 50);
                            triangle(5, 10, 35, -5, 35, -15);
                        break;
                        case 5:
                            ellipse(20, 0, 20, 20);
                        break;
                        case 6:
                            triangle(5, 6, 35, 6, 20, -10);
                            triangle(5, 5, 35, 5, 20, 10);
                        break;
                    }
                popMatrix();
                if(i>unlockt){
                    fill(0, 200);
                    rect(i*50+10, 360, 45, 35);
                    fill(255, 100);
                    ellipse(i*50+33, 372, 15, 15);
                    rect(i*50+22.5, 372, 20, 10);
                    fill(0, 200);
                    arc(i*50+33, 372, 12, 12, 180, 360);
                }
                fill(0, 50);
                rect(Weapon_Bank.length*50+10, 360, 35, 35);
                if(mouseX>Weapon_Bank.length*50+10&&mouseX<Weapon_Bank.length*50+45&&mouseY>360&&mouseY<395){
                    fill(255, 255, 255, 15);
                    rect(Weapon_Bank.length*50+10, 360, 35, 35);    
                    if(mouseIsPressed&&!shovel.activate&&verify===0){
                        shovel.activate=true;    
                    }
                    else if(mouseIsPressed&&shovel.activate&&verify===0){
                        shovel.activate=false;
                    }
                }
                if(abs(mouseX-i*50-35)<22.5&&abs(mouseY-360-35/2)<35/2&&aHeights[1]<10&&all&&i<=unlockt){
                    fill(255, 255, 255, 50);
                    rect(i*50+10, 360, 45, 35);
                    if(mouseIsPressed){
                        for(var j=0; j<Weapon_Bank.length; j++){
                            Weapon_Bank[j][3][0]=400;    
                        }
                        Weapon_Bank[i][3][0]=0;  
                        all=false;
                    }
                }
            }
            shovel.draw();
            Text("Shovel", Weapon_Bank.length*50+27.5, 387.5, 10, CG, W);
            for(var i=0; i<Weapon_Bank.length; i++){
                Weapon_Bank[i][3][1]-=(Weapon_Bank[i][3][1]-Weapon_Bank[i][3][0])/10;
                pushMatrix();
                    translate(Weapon_Bank[i][3][1], 0);
                    textAlign(LEFT, CENTER);
                    Text(" >> "+Weapon_Bank[i][0], 72, 350, 13, CG, W);
                    textAlign(CENTER, CENTER);
                    fill(255, 255, 255);
                    rect(0, 360, width, 40);
                    fill(0, 0, 0, 105);
                    rect(0, 360, width, 40);
                    fill(0, 100);
                    triangle(2, 365, 2, 395, 10, 380);
                    fill(255, 85);
                    triangle(2, 370, 2, 390, 7, 380);
                    if(mouseX<22&&mouseY>360){
                        fill(0, 100);
                        triangle(2, 365, 2, 395, 10, 380);
                        fill(255, 85);
                        triangle(2, 370, 2, 390, 7, 380);
                        if(mouseIsPressed&&verify===0){
                            Weapon_Bank[i][3][0]=400;
                            all=true;
                            selected=0;
                        }
                    }
                    for(var j=0; j<5; j++){
                        fill(0, 0, 0, 200);
                        rect(j*50+20, 360, 45, 35);
                        Text(Weapon_Bank[i][2]*pow(2, j), j*50+85/2, 388, 9, CG, W);
                        fill(colors[j]);
                        pushMatrix();
                            translate(j*50+29, 372.5);
                            scale(0.7);
                            switch(i){
                                case 0:
                                    triangle(20, -15, 5, 10, 35, 10);
                                    fill(0, 50);
                                    triangle(5, 10, 35, 10, 30, 0);
                                break;
                                case 1:
                                    rect(5, -15, 30, 25);
                                    fill(0, 50);
                                    triangle(5, 10, 35, 10, 35, 0);
                                break;
                                case 2:
                                    triangle(20, 10, 5, -15, 35, -15);
                                    triangle(20, -15, 5, 10, 35, 10);
                                    fill(0, 50);
                                    triangle(5, 10, 35, 10, 30, 0);
                                break;
                                case 3:
                                    triangle(20, -15, 10, 1, 30, 1);
                                    arc(20, 0, 20, 20, 0, 180);
                                    fill(0, 50);
                                    triangle(10, 0, 30, 0, 26, -5);
                                    arc(20, 0, 20, 20, 0, 180);
                                break;
                                case 4:
                                    triangle(5, -15, 5, 10, 35, -5); 
                                    rect(5, -15, 30, 10); 
                                    fill(0, 50);
                                    triangle(5, 10, 35, -5, 35, -15);
                                break;
                                case 5:
                                    ellipse(20, 0, 20, 20);
                                break;
                                case 6:
                                    triangle(5, 6, 35, 6, 20, -10);
                                    triangle(5, 5, 35, 5, 20, 10);
                                break;
                            }
                        popMatrix();
                        if(j>Weapon_Bank[i][1]){
                            fill(0, 150);
                            rect(j*50+20, 360, 45, 35);
                            if(j>Weapon_Bank[i][1]+1){
                                fill(255, 100);
                                ellipse(j*50+43, 372, 15, 15);
                                rect(j*50+32.5, 372, 20, 10);
                                fill(0, 200);
                                arc(j*50+43, 372, 12, 12, 180, 360);
                            }
                            else{
                                Text("Buy?", j*50+43, 377, 16, CG, W);    
                            }
                        }
                        if(mouseX>j*50+20&&mouseX<j*50+65&&mouseY>360&&mouseY<495&&Weapon_Bank[i][3][1]<10&&aHeights[1]<10){
                            fill(255, 50);
                            rect(j*50+20, 360, 45, 35);
                            if(j>Weapon_Bank[i][1]&&j-Weapon_Bank[i][1]===1){
                                Text("$"+Weapon_Bank[i][2]*pow(2, j+1), mouseX, mouseY-15, 15, CG, W);
                                Text("to buy", mouseX, mouseY-5, 10, CG, W);
                                if(mouseIsPressed&&money>=Weapon_Bank[i][2]*pow(2, j+1)){
                                    money-=Weapon_Bank[i][2]*pow(2, j+1);
                                    Weapon_Bank[i][1]++;    
                                }
                            }
                            if(mouseIsPressed&&money>=Weapon_Bank[i][2]*pow(2, j)&&j<=Weapon_Bank[i][1]&&selected!==i+1&&verify===0){
                                selected = i+1;
                                selStrength = j;
                            }
                            else if(mouseIsPressed&&selected===i+1&&verify===0){
                                selected=0;
                            }
                        }
                        if(selStrength===j&&selected===i+1){
                            fill(255, 100);
                            rect(j*50+20, 360, 45, 35);    
                        }
                    }
                    for(var k=0; k<Weapon_Bank[i][4].length; k++){
                        Text(Weapon_Bank[i][4][k], 330, 370+k*10, 10, CG, W);
                    }
                popMatrix();
            }
        popMatrix();
        pushMatrix();
            translate(0, aHeights[2]);
            fill(100, 100, 100, 200);
            rect(0, 340, width, 60);
            Text("$-Makers", 40, 350, 13, CG, W);
            for(var i=0; i<moneyMakers.length; i++){
                fill(0, 0, 0, 200);
                rect(i*100+10, 360, 90, 35);
                Text(moneyMakers[i][0], i*100+55, 371, 11, CG, W);
                Text(moneyMakers[i][1]+" : $"+moneyMakers[i][3], i*100+55, 385, 11, CG, W);
                if(mouseX>i*100+10&mouseX<i*100+115&&mouseY>360&&mouseY<395){
                    fill(0, 0, 0, 150);
                    rect(i*100+10, 360, 90, 35);
                    if(moneyMakers[i][2]<5){
                        Text("Upgrade Cost", mouseX, mouseY-15, 11, CG, W);
                        Text("$"+moneyMakers[i][4], mouseX, mouseY-5, 11, CG, W);
                        if(mouseIsPressed&&verify===0&&aHeights[2]<10&&money>=moneyMakers[i][4]){
                            moneyMakers[i][3]=round(2*moneyMakers[i][3]);
                            money-=moneyMakers[i][4];
                            moneyMakers[i][4]=round(2*moneyMakers[i][4]);
                            moneyMakers[i][2]++;
                        }
                    }
                    else{
                        Text("Max Upgrade", mouseX, mouseY-15, 11, CG, W);
                        Text("Reached", mouseX, mouseY-5, 11, CG, W);
                    }
                }
            }
        popMatrix();
        pushMatrix();
            translate(0, aHeights[3]);
            fill(100, 100, 100, 200);
            rect(0, 340, width, 60);
            Text("Settings", 40, 350, 13, CG, W);
        popMatrix();
        pushMatrix();
            translate(0, aHeights[4]);
            fill(100, 100, 100, 200);
            rect(0, 340, width, 60);
            Text("Nothing to see here :000", 90, 350, 13, CG, W);
        popMatrix();
        pushMatrix();
            translate(0, 100-aHeights[0]);
            fill(0, 0, 0, 100);
            triangle(180, 345, 220, 345, 200, 355);
            fill(255, 255, 255, 45);
            triangle(185, 345, 215, 345, 200, 352);
            if(abs(mouseX-200)<20&&abs(mouseY-350)<10&&aHeights[0]!==0){
                fill(0, 0, 0, 150);
                triangle(180, 345, 220, 345, 200, 355);
                fill(255, 255, 255, 63);
                triangle(185, 345, 215, 345, 200, 352);   
                if(mouseIsPressed){
                    for(var i=0; i<heights.length; i++){
                        heights[i]=100;    
                    }
                    heights[0]=0;    
                    selected=0;
                }
            }
        popMatrix();
    };
    //}
    
    //locator function
    //{
    var locator = function(){
        if(mouseX>40&&mouseX<width-40&&mouseY>40&&mouseY<height-40-abs(aHeights[0])/100*20&&selected!==0){
            var x = round((mouseX+20)/40)*40-40;
            var y = round((mouseY+20)/40)*40-40;
            fill(0, 100);
            rect (x, 40, 40, 320);
            rect (40, y, 320, 40);
            if(mouseIsPressed&&grid[y/40-1][x/40-1]===0&&selected!==0&&money>=Weapon_Bank[selected-1][2]*pow(2, selStrength)){
                money-=Weapon_Bank[selected-1][2]*pow(2, selStrength);
                weapons.push(new Weapon(selected-1, selStrength, new PVector(x, y)));
                if(selected!==3){
                    grid[y/40-1][x/40-1] = selected;
                }
                selected = 0;
            }
        }
    };
    //}
    
    //drawObjects function
    //{
    var drawObjects = function(){
        for(var i=0; i<weapons.length; i++){
            weapons[i].draw(); 
            if(weapons[i].life<=0||gameOver){
                grid[weapons[i].pos.y/40-1][weapons[i].pos.x/40-1] = 0;
                for(var j=0; j<15; j++){
                    destparts.push(new DestPart(new PVector(weapons[i].pos.x+20, weapons[i].pos.y), new PVector(random(-1, 1)*2, random(-1, 1)*2), weapons[i].pos.y+20, colors[weapons[i].type]));
                }
                weapons.splice(i, 1);    
            }
        }
        presence = [0, 0, 0, 0, 0, 0, 0, 0];
        for(var i=0; i<enemies.length; i++){
            enemies[i].draw();    
            if(enemies[i].life>0){
                presence[enemies[i].pos.y/40-1]=1;    
            }
            if(gameOver||restart){
                enemies[i].life=0;    
            }
            if(enemies[i].bounce>=0){
                money+=moneyMakers[0][3]+enemies[i].origlife-200;
                if(enemies.length===1){
                    money+=moneyMakers[2][3];
                }
                enemies.splice(i, 1);   
                if(!achievements[1][2]){
                    achievements[1][2]=true;    
                }
            }
        }
        for(var i=0; i<bullets.length; i++){
            bullets[i].draw();    
            if((bullets[i].pos.x>width&&bullets[i].trail.length===0)||bullets[i].trail.length===0){
                bullets.splice(i, 1);    
            }
            else if(gameOver||restart){
                destparts.push(new DestPart(new PVector(bullets[i].pos.x+20, bullets[i].pos.y), new PVector(random(-1, 1)*2, random(-1, 1)*2), bullets[i].pos.y+20, W));
                bullets.splice(i, 1);
            }
        }
        for(var i=0; i<destparts.length; i++){
            destparts[i].draw();    
            if(destparts[i].life<=0){
                destparts.splice(i, 1);    
            }
        }
    };
    //}
    
    //createEnemies function
    //{
    var modulo = 500;
    var createEnemies = function(){
        enemyTime++;
        if(enemyTime%modulo===0&&curSize<=waveSize&&!curTut){
            var bashis = constrain(round(random()*unlockt), 0, 12);
            var life;
            switch(bashis){
                case 3:
                    life = 450;
                break;
                case 4:
                    life = 555;
                break;
                case 5:
                    life = 400;
                break;
                case 6:
                    life = 5555;
                break;
                case 7:
                    life = 800;
                break;
                default:
                    life = bashis*200+200;
                break;
            }
            enemies.push(new Enemy(bashis, new PVector(360, constrain(round(random()*9)*40, 40, 320)), life));
            if(modulo>50){
                modulo-=25;
            }
            curSize++;
        }
    };
    //}
    
    //menu board
    //{
    var optionList = ["Back", "Pause", "Restart"];
    var pause = -1;
    var options = function(){
        for(var i=0; i<optionList.length; i++){
            fill(255, 255, 255, 200);
            rect(365, i*35+50, 30, 30);    
            fill(0, 30);
            triangle(365, i*35+80, 395, i*35+80, 395, i*35+50);
            if(mouseX>365&&mouseX<395&&mouseY>i*35+50&&mouseY<i*35+80){
                fill(0, 40);
                rect(365, i*35+50, 30, 30);
                if(mouseIsPressed){
                    rect(365, i*35+50, 30, 30);
                    switch(i){
                        case 0:
                            if(verify===0){
                                for(var k=0; k<40; k++){
                                    transition.push(new DestPart(new PVector(mouseX, mouseY), new PVector(random(-1, 1)*10, random(-1, 1)*10), height, W, 0));    
                                }
                                for(var j=0; j<menuScenes.length; j++){
                                    menuScenes[j]=false;    
                                }
                                transition[0]=0;
                            }
                        break;
                        case 1:
                            if(verify===0){
                                if(!curTut){
                                    pause*=-1;
                                    if(pause===-1){
                                        optionList[1]="Pause";
                                    }
                                    else{
                                        optionList[1]="Play";
                                    }
                                }
                            }
                        break;
                        case 2:
                            curTut=false;
                            gameOver=false;
                            money=2000;
                            modulo=500;
                            unlockt=0;
                            
                            waveSize = 25;
                            curSize = 0;
                            waveCount[0]=0;
                            waveCount[1]=0;
                            selected=0;
                            selStrength = 0;
                            
                            for(var j=0; j<grid.length; j++){
                                for(var k=0; k<grid[j].length; k++){
                                    grid[j][k]=0;    
                                }
                            }
                            for(var j=0; j<Weapon_Bank.length; j++){
                                Weapon_Bank[j][1]=0;    
                            }
                            for(var j=0; j<moneyMakers.length; j++){
                                moneyMakers[j][2]=0;    
                            }
                            restart=true;
                        break;
                    }
                }
                else{
                    if(i===2){
                        restart=false;
                    }
                }
            }
            textFont(createFont("trebuchet ms"), 10);
            fill(0);
            text(optionList[i], 380, i*35+65);
        }
    };
    //}
    
    //different slides
    //{
    var Menu = function(){
        fill(bgcolor);
        rect(0, 0, width, height);
        fill(255, 50);
        arc(0, 0, width*2, height*2, 0, 90);
        
        textFont(createFont("century gothic"), 50);
        fill(0, 50);
        text("QuantaGuard", 200+5, 70+5);
        fill(0);
        text("QuantaGuard", 200, 70);
        
        fill(0, 50);
        rect(155, 155, 100, 100);
        rect(90, 155, 50, 100);
        rect(270, 155, 50, 100);
        rect(155, 270, 100, 50);
        for(var i=0; i<buttons.length; i++){
            if(mouseX>buttons[i][0]&&mouseX<buttons[i][0]+buttons[i][2]&&mouseY>buttons[i][1]&&mouseY<buttons[i][1]+buttons[i][3]){
                fill(0);
                rect(buttons[i][0]+5, buttons[i][1]+5, buttons[i][2], buttons[i][3]);
                pushMatrix();
                    translate(5, 5);
                    fill(bgcolor);
                    switch(i){
                        case 0:
                            triangle(170, 160, 170, 240, 240, 200);
                            textFont(createFont("trebuchet ms"), 60);
                            text("?", 110, 200);
                        break;
                        case 1:
                            textFont(createFont("trebuchet ms"), 60);
                            text("?", 110, 200);
                        break;
                        case 2:
                            textFont(createFont("trebuchet ms"), 50);
                            text("☆", 200, 290);
                        break;
                        case 3:
                            textFont(createFont("trebuchet ms"), 50);
                            text("©", 289, 200);
                        break;
                    }
                popMatrix();
                fill(255, 50);
                arc(buttons[i][0]+5, buttons[i][1]+5, buttons[i][2]*2, buttons[i][3]*2, 0, 90);
                if(mouseIsPressed&&verify===0&&transition.length===1){
                    for(var k=0; k<40; k++){
                        transition.push(new DestPart(new PVector(mouseX, mouseY), new PVector(random(-1, 1)*10, random(-1, 1)*10), height, W, 0));
                    }
                    transition[0]=i+1;
                }
            }
            else{
                fill(0);
                rect(buttons[i][0], buttons[i][1], buttons[i][2], buttons[i][3]);
                fill(bgcolor);
                switch(i){
                    case 0:
                        triangle(170, 160, 170, 240, 240, 200);
                        textFont(createFont("trebuchet ms"), 60);
                        text("?", 110, 200);
                    break;
                    case 1:
                        textFont(createFont("trebuchet ms"), 60);
                        text("?", 110, 200);
                    break;
                    case 2:
                        textFont(createFont("trebuchet ms"), 50);
                        text("☆", 200, 290);
                    break;
                    case 3:
                        textFont(createFont("trebuchet ms"), 50);
                        text("©", 289, 200);
                    break;
                }
                fill(255, 50);
                arc(buttons[i][0], buttons[i][1], buttons[i][2]*2, buttons[i][3]*2, 0, 90);
            }
        }
    };
    var begin = -1, bouncee = 0;
    var Tutorial  = function(){
        if(begin<0){
            fill(0, 80);
            rect(75, 180, 260, 50);    
            fill(100, 255, 200, 200);
            rect(70, 175, 260, 50);    
            textFont(createFont("trebuchet ms"), 30);
            fill(0);
            text("Begin Tutorial?", 200, 200);
            if(mouseX>70&&mouseX<330&&mouseY>175&&mouseY<225){
                fill(0, 50);
                rect(70, 175, 260, 50);    
                if(mouseIsPressed){
                    begin++;    
                }
            }
        }
        else{
            fill(0, 80);
            rect(5, 155, width, 100);    
            fill(100, 255, 200, 200);
            rect(0, 150, width, 100);
            textFont(createFont("trebuchet ms"), 16);
            fill(0);
            text(tutorial[begin][0], 50, 140, 300, 100);
            switch(begin){
                case 1:
                    if(heights[1]===0){
                        begin++;
                    }
                break;
                case 3:
                    if(!all){
                        begin++;    
                    }
                break;
                case 6:
                    if(Weapon_Bank[0][1]!==0){
                        begin++;
                    }
                break;
                case 7:
                    if(selected!==0){
                        begin++;
                    }
                break;
                case 9:
                    if(all||height[1]===0){
                        begin++;
                    }
                break;
                case 10:
                    if(heights[1]!==0){
                        begin++;   
                    }
                break;
                default:
                    if(mouseIsPressed&&verify===0){
                        begin++;
                    }
                break;
            }
            if(!(tutorial[begin][1][0]===tutorial[begin][1][1]&&tutorial[begin][1][1]===0)){
                for(var i=0; i<10; i++){
                    fill(255, 200, 50, 20);
                    ellipse(tutorial[begin][1][0], tutorial[begin][1][1], 25*i-sin(bouncee)*3, 25*i-sin(bouncee)*3);
                }
                fill(255, 200, 50, 200);
                for(var i=0; i<8; i++){
                    pushMatrix();
                        translate(tutorial[begin][1][0], tutorial[begin][1][1]);
                        rotate(360/8*i);
                        triangle(-5, -20+sin(bouncee)*3, 5, -20+sin(bouncee)*3, 0, -12+sin(bouncee)*3);
                    popMatrix();
                }
                bouncee+=5;
            }
            fill(0, 80);
            rect(133, 88, 140, 30);    
            fill(100, 255, 200, 200);
            rect(130, 85, 140, 30);
            fill(0);
            text((begin+1)+" / "+(tutorial.length-1)+" complete", 200, 100);
            if(begin+1>tutorial.length-1){
                curTut=false;    
            }
        }
    };
    var displayAchievement = function(){
        for(var i=0; i<achievements.length; i++){
            if(achievements[i][2]&&achievements[i][3]<=180){
                achievements[i][3]++;
                var x = achievements[i][3];
                fill(0, 80);
                rect(5, -45+100*(sin(x)+sin(3*x)/3+sin(5*x)/5+sin(7*x)/7), width, 50);
                fill(50, 250, 150, 200);
                rect(0, -50+100*(sin(x)+sin(3*x)/3+sin(5*x)/5+sin(7*x)/7), width, 50);
                fill(0);
                textFont(createFont("trebuchet ms"), 18);
                text(achievements[i][0], 200, -25+100*(sin(x)+sin(3*x)/3+sin(5*x)/5+sin(7*x)/7));
                fill(0, 150);
                textFont(createFont("trebuchet ms"), 12);
                text("Achievement Unlocked! 🔓", 200, -40+100*(sin(x)+sin(3*x)/3+sin(5*x)/5+sin(7*x)/7));
                text(achievements[i][1], 200, -10+100*(sin(x)+sin(3*x)/3+sin(5*x)/5+sin(7*x)/7));
            }
        }
        if(!curTut&&!achievements[0][2]){
            achievements[0][2]=true;    
        }
        if(money>=100000&&!achievements[4][2]){
            achievements[4][2]=true;
        }
        if(money>=1000000&&!achievements[5][2]){
            achievements[5][2]=true;
        }
        for(var i=0; i<Weapon_Bank.length; i++){
            if(Weapon_Bank[i][1]===4){
                achievements[12+i][2]=true;    
            }
        }
    };
    var Battlefield = function(){
        time+=1;
        if(round(time)%63===0&&enemies.length>0&&!curTut&&!restart){
            money+=moneyMakers[1][3];
        }
        pushMatrix();
            translate(0, 0);
            image(bg_image, 40, 40);
            textAlign(LEFT, CENTER);
            Text("QuantaGuard", 20, 20, 20, CG, W);
            textAlign(CENTER, CENTER);
            fill(255, 50, 150);
            rect(190, 10, 100, 20);
            fill(50, 255, 150);
            rect(190, 10, 100*(curSize)/(waveSize+1), 20);
            fill(0, 50);
            triangle(190, 30, 290, 30, 290, 10);
            fill(255, 100);
            arc(190, 10, 200, 40, 0, 90);
            
            locator();
            drawObjects();
            toolBar();
            createEnemies();
        popMatrix();
        options();
        if(curSize>waveSize&&enemies.length===0&&!gameOver){
            if(waveCount[0]===waveCount[1]){
                waveCount[0]++;
                if(unlockt<6){
                    achievements[unlockt+6][2]=true;
                }
                unlockt++;
                achievements[3][2]=true;
            }
            if(mouseX>190&&mouseX<290&&mouseY>10&&mouseY<30){
                fill(0, 150);
                rect(190, 10, 100, 20);
                Text("Proceed", 240, 20, 15, CG, W);
                if(mouseIsPressed){
                    curSize=0;
                    if(waveSize<120){
                        waveSize+=10;
                    }
                    waveCount[1]++;
                }
            }
            else{
                Text("Proceed", 240, 20, 15, CG, color(0));
            }
            fill(0, 150);
            rect(0, 50, width, 70);
            rect(190, 35, 100, 30);
            Text("Wave "+waveCount[0]+" Complete", 200, 85, 35, CG, W);
            Text("^Click this^", 240, 50, 15, CG, W);
        }
        moneyCounter-=(moneyCounter-money)/4;
        if(gameOver){
            fill(0, 150);
            rect(0, 160, width, 80);
            Text("Game Over!", 200, 200, 60, CG, W);
            fill(0, 150);
            rect(150, 255, 100, 30);
            Text("Restart?", 200, 270, 20, CG, W);
            if(mouseX>150&&mouseX<250&&mouseY>255&&mouseY<275){
                fill(255, 50);
                rect(150, 255, 100, 30);
                if(mouseIsPressed&&verify===0){
                    gameOver=false;
                    money=2000;
                    modulo=500;
                    unlockt=0;
                    
                    waveSize = 25;
                    curSize = 0;
                    waveCount[0]=0;
                    waveCount[1]=0;
                    selected=0;
                    selStrength = 0;
                    
                    for(var i=0; i<grid.length; i++){
                        for(var j=0; j<grid[i].length; j++){
                            grid[i][j]=0;    
                        }
                    }
                    for(var i=0; i<Weapon_Bank.length; i++){
                        Weapon_Bank[i][1]=0;    
                    }
                    for(var j=0; j<moneyMakers.length; j++){
                        moneyMakers[j][2]=0;    
                    }
                }
            }
        }
        if(pause===1){
            noLoop();    
        }
        
        if(curTut){
            Tutorial();
        }
        displayAchievement();
    };
    var Help = function(){
        fill(150, 100, 250);
        rect(0, 0, width, height);
        fill(255, 50);
        arc(0, 0, width*2, height*2, 0, 90);
        textFont(CG, 40);
        fill(0, 100);
        text("Help", 205, 55);
        fill(255);
        text("Help", 200, 50);
        textFont(createFont("trebuchet ms"), 25);
        fill(0, 50);
        text("Instructions will be provided throughout the game.", 5, 130, 400, 150);
        fill(255);
        text("Instructions will be provided throughout the game.", 0, 125, 400, 150);
    };
    var scroll = [0, 0];
    var Achievements = function(){
        fill(50, 250, 150);
        rect(0, 0, width, height);
        fill(255, 50);
        arc(0, 0, width*2, height*2, 0, 90);
        pushMatrix();
            translate(0, scroll[0]);
            textFont(CG, 40);
            fill(0, 100);
            text("Achievements", 205, 55);
            fill(255);
            text("Achievements", 200, 50);
            for(var i=0; i<achievements.length; i++){
                fill(0, 50);
                rect(25, i*50+105, 360, 40);
                fill(0, 150, 0);
                rect(20, i*50+100, 360, 40);
                fill(255, 50);
                arc(20, i*50+100, 720, 80, 0, 90);
                textFont(createFont("trebuchet ms"), 20);
                textAlign(LEFT, CENTER);
                fill(0, 100);
                text(achievements[i][0], 43, i*50+123);
                fill(255);
                text(achievements[i][0], 40, i*50+120);
                if(!achievements[i][2]){
                    text("🔒", 330, i*50+120);
                }
                if(mouseX>20&&mouseX<380&&mouseY>i*50+100+scroll[0]&&mouseY<i*50+140+scroll[0]){
                    textSize(13);
                    fill(0);
                    text(achievements[i][1], mouseX+5, mouseY-scroll[0]-5);
                }
                textAlign(CENTER, CENTER);
            }
        popMatrix();
        fill(0, 100);
        if(scroll[1]>achievements.length*-50+200){
            triangle(200, 370, 180, 355, 220, 355);
        }
        if(scroll[1]<0){
            triangle(200, 30, 180, 45, 220, 45);
        }
        if(mouseY>=350){
            if(abs(scroll[0]-scroll[1])<1&&scroll[1]>achievements.length*-50+200){
                scroll[1]-=50;    
            }
        }
        if(mouseY<50){
            if(abs(scroll[0]-scroll[1])<1&&scroll[1]<0){
                scroll[1]+=50;    
            }
        }
        scroll[0]-=(scroll[0]-scroll[1])/10;
    };
    var Credits = function(){
        fill(250, 100, 150);
        rect(0, 0, width, height);
        fill(255, 50);
        arc(0, 0, width*2, height*2, 0, 90);
        textFont(CG, 40);
        fill(0, 100);
        text("Credits", 205, 55);
        fill(255);
        text("Credits", 200, 50);
        textFont(createFont("trebuchet ms"), 25);
        fill(0, 50);
        text("This game is entirely by Arrowhead Co. [Mo David]", 5, 130, 400, 150);
        fill(255);
        text("This game is entirely by Arrowhead Co. [Mo David]", 0, 125, 400, 150);
    };
    var Back = function(){
        fill(0, 50);
        rect(15, 355, 40, 40);
        fill(255);
        if(mouseX>10&&mouseX<50&&mouseY>350&&mouseY<390){
            rect(15, 355, 40, 40);
            fill(0);
            textFont(createFont("trebuchet ms"), 13);
            text("Back", 35, 375);
            if(mouseIsPressed&&verify===0){
                for(var k=0; k<40; k++){
                    transition.push(new DestPart(new PVector(mouseX, mouseY), new PVector(random(-1, 1)*10, random(-1, 1)*10), height, W, 0));    
                }
                for(var i=0; i<menuScenes.length; i++){
                    menuScenes[i]=false;    
                }
                transition[0]=0;
            }
        }
        else{
            rect(10, 350, 40, 40);
            fill(0);
            textFont(createFont("trebuchet ms"), 13);
            text("Back", 30, 370);
        }
    };
    //}
    
    draw = function() {
        background(155, 155, 155);
        if(menuScenes[1]){
            Battlefield();    
        }
        if(menuScenes[2]){
            Help();
        }
        if(menuScenes[3]){
            Achievements();
        }
        if(menuScenes[4]){
            Credits();
        }
        if(menuScenes[0]){
            Menu();
        }
        else if(!menuScenes[1]){
            Back();    
        }
        for(var i=1; i<transition.length; i++){
            transition[i].draw();    
            if(transition[i].life<=0){
                transition.splice(i, 1);    
                menuScenes[0]=false;
                menuScenes[transition[0]]=true;
            }
        }
        verify++;
    };
    
    mousePressed = function(){
        verify = 0;
        if(pause===1&&mouseX>365&&mouseX<395&&mouseY>85&&mouseY<115){
            loop();
        }
    };
    
    keyPressed = function(){
        if(keyCode!==SHIFT){
            username.push(key.toString());
        }
        if(username.length>20){
            username.splice(0, 1);    
        }
        var actualUsername = "";
        for(var i=0; i<username.length; i++){
            actualUsername+=username[i];
        }
        if(actualUsername==="admin.hack()=true"){
            unlockt = 11;
            money = 1000000;
        }
    };
    //}
    };
    main();