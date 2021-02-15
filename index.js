
      //sbhi div ko individually access kro.
      //modern js me var keyword ka  use ni krte hai balki const ka use jrte hai.
      const score = document.querySelector(".score"); //check krega score name ka class kidhar hai fir store kr lega score me.

      const startScreen = document.querySelector(".startScreen");
      const gameArea = document.querySelector(".gameArea");
      // console.log(score);
      // isse hmlog score div ko completly access kar skte hai.

      startScreen.addEventListener("click", start);
      //jb v start screen pe koi click krega to game chalu ho jayga yani start name ka callback fn invoke ho jayga.
// ab ham player name ka object bna diye.
      //player khelna chalu kiya hai ki ni uski assurty k lye.
      let player = { speed: 5, score: 0 };
      //1 empty object create kiya.
      //player name k object me ab 1 property indroduce kro speed key value pair se.

      //lets create a object "keys". key value pair hoga.
      let keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
      };
      // console.log(keys);
      //in 4 keys me koi 1 hi true ho at a time.

      //vo jo pura screen dikhayi de ra hai na js me usko bolte hai document.
      //user kon se key press kr ra hai usko btaane k lye niche ka code : -
      document.addEventListener("keydown", keyDown);
      //jab v koi keydown krega to hmara keyDown fn invoke(call) ho jayga.
      //yha keyDown 1 callback function hai.
      //jab hum key ko release kr dete hai to automatically to upar aate hai na uske lye niche k code.keyup & keydown events ka name hai.
      document.addEventListener("keyup", keyUp);

      function keyDown(e) {
        e.preventDefault();
        //console.log(e.key); //kon sa key user press kar ra hai vo console me likhayega e.g s to s likhega, u to u likhega.
        // console.log(keys);
        keys[e.key] = true; //jaise hi press krenge to upar / left/r8 chlne lgega but ye to hmesha k lye true ho gya
        // console.log(keys);
      }
      function keyUp(e) {
        e.preventDefault();
        // console.log(e.key); //user kon sa key release kar ra hai,vo batayega.
        keys[e.key] = false; //jaise hi key release kroge vaise hi ye false ho jayga .
        // console.log(keys);
      }
      //jahir si baat hai jo key press kroge vo vapas se release kroge hi so both will write over console at the same time.

      //bydefault js functionallity provide krta hai vo mjhe ni chahye so e.prevent

      function isCollide(a, b) {
        //a,b red car ka cordinate hai
        aRect = a.getBoundingClientRect();
        bRect = b.getBoundingClientRect(); //bRect enemy ka car ko present kr r hai.
        return !(
          aRect.top > bRect.bottom ||
          bRect.top > aRect.bottom ||
          aRect.right < bRect.left ||
          bRect.right < aRect.left
        );
      }

      function moveLines() {
        let lines = document.querySelectorAll(".lines"); //since i want all line so access to querySelectorAll with classname lines.
        lines.forEach(function (item) {
          if (item.y >= 700) {
            //jaise hi apna lin`e 700 ko touch kar jata hai
            item.y -= 750; //700 pe touch hote hi vapas vo -750 pe set ho jayga aur fir upar se niche aate hue dikhega.
          }
          item.y += player.speed;
          item.style.top = item.y + "px";
        }); //us line ko move krwana hai so we use forEach fn(like for fn) , is fn ja argument 1 anonymous fn hota hai jiske 3 parameter hote hai but "item " value compulsary hai baki 2 optional hai.
      }
      function endGame() {
        player.start = false;
        startScreen.classList.remove("hide");
        let ps = player.score + 2;
        startScreen.innerHTML =
          " Game Over <br> Your Final Score is " +
          ps +
          " <br>Press here to restart the Game ";
      }
      function moveEnemy(car) {
        let enemy = document.querySelectorAll(".enemy"); //since i want all line so access to querySelectorAll with classname enemy.
        enemy.forEach(function (item) {
          if (isCollide(car, item)) {
            console.log("Boom hit!");
            endGame();
          }
          if (item.y >= 750) {
            //jaise hi apna 3 car 750 ko touch kar jata hai vaps aat hai 300 k diff pe.
            item.y = -300; //300 k diff pe 3ra aur 4th car rhega.
            item.style.left = Math.floor(Math.random() * 350) + "px";
          }
          item.y += player.speed;
          item.style.top = item.y + "px";
        }); //us line ko move krwana hai so we use forEach fn(like for fn) , is fn ja argument 1 anonymous fn hota hai jiske 3 parameter hote hai but "item " value compulsary hai baki 2 optional hai.
      }
      function gamePlay() {
        // console.log("hi , I'm clicked");
        let car = document.querySelector(".car"); //car class vale div ko access kr lye
        //ab dekh - car hmara road tak hi limit rhe iske liye ham road ka size or coordinate jaan lete hai fir usko gamearea me limit kr denge
        let road = gameArea.getBoundingClientRect();
        //domRect = element.getBoundingClientRect(), isse game area me boundede ho jayga element.
        // console.log(road); //isse hmko road ka pura coardinate mil gya ki vo document page pe kitna x me kitna y me hai.ab car ko limitation de dete hai.

        if (player.start) {
          moveLines(); //line continious manner me aaye iske lye ye fn bnaya.
          moveEnemy(car);
          if (keys.ArrowUp && player.y > road.top + 70) {
            //y>road.top+70 taki koi dusri car aaye to ham use dekh ske nhi to taakar maar denge.
            player.y -= player.speed;
          } //top k value agar increase ho rhi hai to y coordinate decrease ho ra hoga. player object ka speed property access kiye hai.
          if (keys.ArrowDown && player.y < road.bottom - 85) {
            //70 is height of car.
            player.y += player.speed;
          } //top k value agar decrease ho rhi hai to y coordinate increase ho ra hoga.
          if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
          } //left k value agar inc ho rhi hai to  x coordinate decrease ho ra hoga.
          if (keys.ArrowRight && player.x < road.width - 50) {
            //car ki khud ki width 50 px hai na so minus kiya isse aage nhi ja sakta ..50=50px here.
            player.x += player.speed;
          }
          //mjhe basically car ki value ko change krna hai. so js k andar css ko use krenge by...
          car.style.top = player.y + "px"; //315px js k dwara px ko concinate kiya.
          car.style.left = player.x + "px";

          window.requestAnimationFrame(gamePlay);
          console.log(player.score++);
          player.score++;
          score.innerText = "Score : " + player.score;
        }
        //ab ye infinite loop me chla gya hai baar baar call hoga.
      }
      function start() {
        //start screen hide hoke gamearea chalu ho jata hai below code are 4 this.
        //game area se hide ko remove kr do start hote hi.
        // console.log(gameArea);
        // gameArea.classList.remove("hide");
        //ab startscreen ko hide kr do since game has begun.
        startScreen.classList.add("hide");
        gameArea.innerHTML = "";

        player.start = true;
        //everything is object in js we can mention/define any property by "." matlab haa bhi player aab khelna chahta hai.
        //strat hote hi hmko animation chahye

        player.score = 0;

        window.requestAnimationFrame(gamePlay); // window bydefault object hai(na likho to v koi problem ni hai) jiska 1 method hai requestAnimationFrame jiske andar callback fn hota hai.ye vo fn hota hai jisko aap invoke ya call krna chahte ho
        //agar aapko continious effect chahye to isi callbackfn k andar vapas se requestAnimationFrame ko call krna prega.
        //ab game start ho gya hai car add krnahai path pe (ye html/css se v ho skta hai but we will do this by pure js).

        for (x = 0; x < 5; x++) {
          //ab gamearea me mjhe multiples line bnane hai track path vala 5 line
          let roadLine = document.createElement("div"); //div bna liya jiska name hai road line.
          roadLine.setAttribute("class", "lines"); //isse class ko add kiya ,2 argument leta hai name and value.
          roadLine.y = x * 150; //roadline object ka 1 property define kr dye.
          roadLine.style.top = roadLine.y + "px"; //top k jgh height v likh skte hai.
          //ab gamearea me mjhe us div ko append kar den hai.
          gameArea.appendChild(roadLine);
        }

        let car = document.createElement("div"); //document k andar div name se 1 class bnay
        car.setAttribute("class", "car"); //car name ka 1 class add ho gya hai.
        //car.innerText = "hello i'm yr car"; //
        gameArea.appendChild(car);

        // ye jo hmne car bnayi iska document page me exact location kha hai x&y co ordinate system.
        // console.log("top position" + car.offsetTop); //upar se car ki kya position hai.
        // console.log("left position" + car.offsetLeft); //left se car ki kya position hai.
        //yha pe offsetLeft& offsetTop ka value constant hai(left: 50px; bottom: 120px;) but agar ham us constant value ko change krte hai to car mr movement hota hai.
        //how?? -->soln
        player.x = car.offsetLeft; //player ka 1 property set kiye matlab agar console.log(player.x) kroge to left positionpta chal jaygi
        player.y = car.offsetTop; //player ka 1 property set kiye top se cordinate , in js everything is object aur ham object ki proprty ham define kr skte hai.

        for (x = 0; x < 3; x++) {
          //ab gamearea me mjhe 3 car bnane hai enemy ki.
          let enemyCar = document.createElement("div"); //div bna liya jiska name hai road line.
          enemyCar.setAttribute("class", "enemy"); //isse class ko add kiya ,2 argument leta hai name and value.
          enemyCar.y = (x + 1) * 350 * -1; //enemyCar object ka 1 property define kr dye.
          enemyCar.style.top = enemyCar.y + "px"; //top k jgh height v likh skte hai.
          //ab gamearea me mjhe us div ko append kar den hai.
          enemyCar.style.backgroundColor = randomColor(); //js k through color set kya enemycar ka.
          //ab is car ko diff pos pe dalna hai.
          enemyCar.style.left = Math.floor(Math.random() * 350) + "px"; //Math.random() 0.123,0.5923 isi trah ka no generate krta hai. so *350 kiya. now game area me left se itna dist dikhayi dega car ka.
          gameArea.appendChild(enemyCar);
        }
      }
      function randomColor() {
        function c() {
          let hex = Math.floor(Math.random() * 256).toString(16);
          //Convert a number to a hexadecimal string with:
          //hexString = yourNumber.toString(16); ....
          return ("0" + String(hex)).substr(-2);
          //substr(-2) ka matlab ki last ka 2 digit of string(hex) concatinate with 0.
        }
        return "#" + c() + c() + c(); //hexacolour ka format return krna hai.(string ko concatinate kiya hai) 6 digit code
      }
    