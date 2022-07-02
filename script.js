$(document).ready(function () {
  // Button Start - Início do GAME
  $(".btn-start").click(function () {
    var startTime = new Date() / 1000;
    $(this).hide();
    $("#conteudo").show();

    let cardData = [
      { imgSrc: "./img/facebook.png", id: 1, name: "facebook" },
      { imgSrc: "./img/android.png", id: 2, name: "android" },
      { imgSrc: "./img/chrome.png", id: 3, name: "chrome" },
      { imgSrc: "./img/firefox.png", id: 4, name: "firefox" },
      { imgSrc: "./img/html5.png", id: 5, name: "html5" },
      { imgSrc: "./img/googleplus.png", id: 6, name: "googleplus" },
      { imgSrc: "./img/twitter.png", id: 7, name: "twitter" },
      { imgSrc: "./img/windows.png", id: 8, name: "windows" },

      { imgSrc: "./img/facebook.png", id: 1, name: "facebook" },
      { imgSrc: "./img/android.png", id: 2, name: "android" },
      { imgSrc: "./img/chrome.png", id: 3, name: "chrome" },
      { imgSrc: "./img/firefox.png", id: 4, name: "firefox" },
      { imgSrc: "./img/html5.png", id: 5, name: "html5" },
      { imgSrc: "./img/googleplus.png", id: 6, name: "googleplus" },
      { imgSrc: "./img/twitter.png", id: 7, name: "twitter" },
      { imgSrc: "./img/windows.png", id: 8, name: "windows" },
    ];

    // Organizar os cards de forma aleatória
    cardData.sort(() => Math.random() - 0.5);

    // Criando a estrutura do arquivo utilizando o JQuery
    $(cardData).each(function (index, item) {
      const section = $("#tabuleiro");
      $(section).append('<img class="card"></img>');
      const card = $("#tabuleiro > img")[index];
      $(".card").css("pointer-events", "none");
      $(card).attr({
        name: item.name,
        id: item.id,
        src: item.imgSrc,
      });
      setTimeout(() => {
        $(".card").fadeOut("slow", function () {
          $(".card").css("pointer-events", "auto");
          $(".card").attr("src", `./img/cross.png`);
          $(".card").fadeIn("slow");
        });
      }, 3000);
    });

    // Criando a função de Virar e Desvirar a carta
    $(".card").click(function () {
      if ($(this).attr("status") !== "checking") {
        $(this).attr("status", "checking");
        $(this).slideToggle("slow", function () {
          $(this).attr("src", `./img/${this.name}.png`);
          $(this).slideToggle("fast");
        });
      }
    });

    let cardsMatched = [];
    let movesCards = 0;
    $(document).on("click", ".card", function () {
      $(this).attr("status", "checking");
      let selectedCards = $('.card[status="checking"]');
      if (selectedCards.length == 2) {
        movesCards += 1;
        $("#moves-count").text(movesCards);
        // Verificar se as cartas selecionadas são iguais
        if (
          $(selectedCards[0]).attr("name") === $(selectedCards[1]).attr("name")
        ) {
          $('.card[status="checking"]')
            .attr("status", "confirmed")
            .css("pointer-events", "none");
          cardsMatched.push(selectedCards);
          // Verifica se todas as cartas foram encontradas
          if (cardsMatched.length == 8) {
            let endTime = new Date() / 1000;
            let totalTime = endTime - startTime;
            $("#time-count").text(`${totalTime.toFixed(3)} segundos`);
            setTimeout(() => {
              alert("Jogo Finalizado!");
            }, 1000);
            $(".card").css("pointer-events", "none");
          }
          // Cartas não iguais são desviradas para a parte de trás da carta.
        } else {
          $(".card").css("pointer-events", "none");
          setTimeout(() => {
            $('.card[status="checking"]').fadeOut("slow", function () {
              $('.card[status="checking"]')
                .attr("src", `./img/cross.png`)
                .fadeIn("slow");
              $('.card[status="checking"]').attr("status", "");
            });
            $(".card").css("pointer-events", "auto");
          }, 3000);
        }
      }
    });
  });
});
