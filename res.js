window.onload = myFunction;

var myVar;

//get a random album from local storage for displaying in loadin screen
var lsAlbum1 = localStorage.getItem("album1");
var lsAlbum2 = localStorage.getItem("album2");
var lsAlbum3 = localStorage.getItem("album3");
var lsAlbum4 = localStorage.getItem("album4");
var lsAlbum5 = localStorage.getItem("album5");

var username = localStorage.getItem("username");
var db_name = localStorage.getItem("db_name");

var ls2Album1 = lsAlbum1;
var ls2Album2 = lsAlbum2;
var ls2Album3 = lsAlbum3;
var ls2Album4 = lsAlbum4;
var ls2Album5 = lsAlbum5;

var albumsArray = [
  ls2Album1,
  ls2Album2,
  ls2Album3,
  ls2Album4,
  ls2Album5
];

//loading screen timeout
function myFunction() {
  myVar = setTimeout(showPage, 0000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "flex";

  var lsPoints = localStorage.getItem("points");
  var res = localStorage.getItem("RESULT");

  var res2 = res;
  var ls2Points = lsPoints;

  // console.log("points::" + ls2Points);
  // console.log("resss::" + res2);

  var badPoints = [
    "It's not subjective at all. Your taste is bad, and you should feel bad.",
    "We expected nothing and we're still disappointed.",
    "We heard rumors that you are not a good person. At all. And it's true.",
    "Elephants wish they could forget you.",
    "You are a pizza burn on the roof of the world's mouth.",
  ];

  var goodPoints = [
    "Your parents did an excellent job raising you.",
    "Is your name John? Cuz I’ve never Cena person like you before.",
    "Are you a broken compass? Cos I don't know where I was going with that one.",
    "You're actually alright.",
    "If Einstein could meet you, he'd be 'mildly to moderately' intimidated.",
    "You'll do",
  ];

  var VerygoodPoints = [
    "You're our favorite.",
    "You're as good as it gets.",
    "You are effervescent.",
    "We're going to have to ask you to leave. You're making the other people here look bad.",
    "",
  ];

  var ZeroPoints = [
    "Something about being on top of the Bell-curve.",
    "We’ve seen worse from better.",
    "You're tacky and we hate you.",
    "You're like a really, really boring Tuesday. A rainy Tuesday.",
    "Your mother was a hamster and your father smelt of elderberries.",
  ];


  var randomItemBad = badPoints[Math.floor(Math.random() * badPoints.length)];
  var randomItemGood = goodPoints[Math.floor(Math.random() * goodPoints.length)];
  var randomItemVeryGood = VerygoodPoints[Math.floor(Math.random() * VerygoodPoints.length)];
  var randomItemZero = ZeroPoints[Math.floor(Math.random() * ZeroPoints.length)];

  if (ls2Points >= 50) {

    document.getElementById("randomy").textContent = randomItemVeryGood;
    document.getElementById("ppl").textContent = "Here is a wonderful list of wonderful people with the same wonderful taste as you.";

  }

  else if (ls2Points == 0) {

    document.getElementById("randomy").textContent = randomItemZero;
    document.getElementById("ppl").textContent = "Here is a list of people, who apparently have the same taste as you.";

  }

  else if (ls2Points > 0 && ls2Points < 50) {

    document.getElementById("randomy").textContent = randomItemGood;
    document.getElementById("ppl").textContent = "Here is a list of people with the same taste as you.";

  }

  else if (ls2Points < 0) {

    document.getElementById("randomy").textContent = randomItemBad;
    document.getElementById("ppl").textContent = "Here is a wacky list of wacky people with the same wacky taste as you.";

  }

  // ***************************************************

  document.getElementById("points-t").textContent = "You Scored " + ls2Points + " Points";
}


setInterval(function randomText() {

  // var randomArtist = albumsArray[Math.floor(Math.random() * albumsArray.length)];

  // console.log(randomArtist);

  var loadingTexts = [
    'Downloading Downloader...',
    'Debugging Debugger...',
    'Updating Updater...',
    'It\'s not looking good, mate',
    'Do you come here often?',
    'I’ve got problem for your solution.',
    'Well, this is embarrassing.',
    'Dividing by zero...',
    'The Elders of the Internet are contemplating your request...',
    'The internet is full... Please wait... ',
    'Don\'t sweat the petty things and don\'t pet the sweaty things.',
  ];

  var randomLoading = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
  document.getElementById("l-randoms").textContent = randomLoading;

}, 3000);

var userSongs = JSON.parse(localStorage.getItem("userSongs"));
var finalSongString = JSON.parse(localStorage.getItem("finalSongString"));

var rootRef2 = firebase.database().ref().child("Arrays");

var counter = 0;

rootRef2.once("value", function (snapshot) {
  snapshot.forEach(function (child) {

    var chk = child.key;
    
    var rootRef3 = firebase.database().ref().child("Arrays/" + child.key);

    //download data
    rootRef3.once("value", function (snapshot) {

      var datasnap = snapshot.val();
      var SString = datasnap.SString;
      var nambe = datasnap.name;
      var DbMatch = [finalSongString, SString];

      //find how many values match
      var DbResult = DbMatch.shift().filter(function (v) {
        return DbMatch.every(function (a) {
          return a.indexOf(v) !== -1;
        });
      });

      var DBindexes = [];
      var DBresultArr = [];

      DbResult.forEach(function (source) {
        DBindexes.push(finalSongString.indexOf(source))
      });

      for (var i = 0; i < DBindexes.length; i++)
        DBresultArr.push(" " + userSongs[DBindexes[i]]);


      if (DbResult.length >= 1 && child.key != username) {

        for (var i = 0; i < DBresultArr.length; i++) {
          DBresultArr[i] = DBresultArr[i].capitalize().replace(/ -/g, " -");
        }

        //upload data
        var rootRef = firebase.database().ref().child("Matches");
        var userMatches =
        {
          "the_matched": nambe,
          "matches": DBresultArr,
          "nr_of_matches": DBresultArr.length,
        };

        rootRef.child(db_name).child(child.key).set(userMatches, function (error) {
          if (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message:" + errorMessage);
          }
          else {
            // console.log(" username: "+ username + " child key: " +child.key + " matches: " +DBresultArr+ " nr_of_matches: " +DBresultArr.length);
          }
        });

        const ref = firebase.database().ref('Matches/' + db_name).orderByChild('nr_of_matches')
        ref.once('value', function (snapshot) {
          snapshot.forEach(function(child) {
          const matches = child.val().matches
          const nr_of_matches = child.val().nr_of_matches
          const the_matched = child.val().the_matched
          console.log("matches : " + matches)

          document.getElementById("ppl").style.visibility = "visible";
          
          counter ++;
          console.log(counter)

          if (nr_of_matches == 1) {
            document.getElementById("f1").innerHTML += " <br><br><br><br><br><br><br><br></br> <span class='counter'> #" + counter + "</span> <br><br><br><br><br><br><br><br><span class='name'>" + the_matched + "</span>" +
              "<br>" + "<span class='common'> You have </span>" + "<span class='common'>" + nr_of_matches +
              "</span>" + "<span class='common'>song in common:</span><br><br><br> <span class='common2'>" +
              matches + "</span><br><br><br><br><br><br><br><br><br><br><br><br><br>";
          }
          else if (nr_of_matches >= 2) {
            document.getElementById("f1").innerHTML += " <br><br><br><br><br><br><br><br></br> <span class='counter'> #" + counter + "</span> <br><br><br><br><br><br><br><br><span class='name'>" + the_matched + "</span>" +
              "<br>" + "<span class='common'> You have </span>" + "<span class='common'>" + nr_of_matches +
              "</span>" + "<span class='common'>songs in common:</span> <br><br><br> <span class='common2'>" +
              matches + "</span><br><br><br><br><br><br><br><br><br><br><br><br><br>";
          }
        });
        });
      }

    })
  });

});

String.prototype.capitalize = function () {
  return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};


// GRAPHSSSSSSSSSSSSSSSSSSS********************************************************************

var labelss = JSON.parse(localStorage.getItem("labelss"));

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "polarArea",
  data: {
    labels: userSongs,
    datasets: [{
      label: "# of Votes",
      data: labelss,
      backgroundColor: [
        "rgba(255, 99, 132, .3)",
        "rgba(54, 162, 235, .3)",
        "rgba(255, 206, 86, .3)",
        "rgba(75, 192, 192, .3)",
        "rgba(255, 159, 64, .3)"
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 3,
    }]
  },
  options: {
    legend: {
      display: false,
    },
    scale: {

      ticks: {
        min: -15,
        max: 10
      },

      display: true
    }, title: {
      display: false,
      text: ""
    }, tooltips: {
      enabled: true,
    },
  },
});
