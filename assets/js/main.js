(function (window, document, $, undefined) {
  'use strict';

  var chatenaiJs = {
      i: function () {
          chatenaiJs.d();
          chatenaiJs.methods();
      },

      d: function () {
          this._window = $(window);
          this._document = $(document);
          this._body = $("body");
          this._html = $("html");
      },

      methods: function () {
          chatenaiJs.headerSticky();
          chatenaiJs.popupDislikeSection();
          chatenaiJs.popupleftdashboard();
          chatenaiJs.popuprightdashboard();
          chatenaiJs.preloaderInit();
          chatenaiJs.showMoreBtn();
          chatenaiJs.radialProgress();
          chatenaiJs.menuCurrentLink();
          chatenaiJs.languageSelected();
          chatenaiJs.checkCollapsed();
          chatenaiJs.initBlockWidth();
          chatenaiJs.appendSticky();
      },

      initBlockWidth: function () {
          const aiSpeechElements = document.querySelectorAll('.ai-speech-init');
          const chatContainer = document.getElementById('chatContainer');

          if (chatContainer) {
              const chatContainerWidth = chatContainer.offsetWidth;
              aiSpeechElements.forEach(element => {
                  element.style.width = chatContainerWidth + 'px';
              });
          }
      },

      appendSticky: function () {
          const aiSpeechElements = document.querySelectorAll('.ai-speech-init');
          chatenaiJs.initBlockWidth();

          const handleScroll = () => {
              const scrollPosition = window.scrollY;
              aiSpeechElements.forEach(element => {
                  element.classList.toggle('sticky', scrollPosition > 50);
              });
          };

          const handleResize = () => {
              chatenaiJs.initBlockWidth();
          };

          window.addEventListener('scroll', handleScroll);
          window.addEventListener('resize', handleResize);
      },

      checkCollapsed: function () {
          const updateHeader = () => {
              const leftSection = document.querySelector('.popup-dashboardleft-section');
              const rightBtn = document.querySelector('.popup-dashboardright-section');
              const header = document.querySelector('.rbt-dashboard-header');
              if (leftSection && rightBtn && header) {
                  header.classList.toggle('header-bg', leftSection.classList.contains('collapsed') && rightBtn.classList.contains('collapsed'));
              }
          };

          updateHeader();
          $(window).on("resize", updateHeader);
      },

      // Set language dropdown default text and handle language selection
      languageSelected: function () {
          const defaultText = "Español";
          const defaultImage = "assets/images/flags/es.png";
          $(".language-switch .dropdown-toggle").html(
              `<img src="${defaultImage}" alt="${defaultText}" class="me-2" style="width: 20px;">${defaultText} <span class="caret"></span>`
          );

          $("#languageDropdown li").click(function () {
              const selText = $(this).find("span").text();
              const selImage = $(this).find("img").attr("src");
              $(this).parents('.dropdown').find('.dropdown-toggle').html(
                  `<img src="${selImage}" alt="${selText}" class="me-2" style="width: 20px;">${selText} <span class="caret"></span>`
              );
          });
      },

      menuCurrentLink: function () {
          const current = location.pathname.split("/").pop();
          $(".dashboard-mainmenu li a, .mainmenu li a, .user-nav li a").each(function () {
              const $this = $(this);
              if ($this.attr("href") === current) {
                  $this.addClass("active");
                  $this.parents(".has-menu-child-item").addClass("menu-item-open");
              }
          });
      },

      popupDislikeSection: function () {
          $(".dislike-section-btn").on("click", function () {
              $(".popup-dislike-section").addClass("active");
          });

          $(".close-button").on("click", function () {
              $(".popup-dislike-section").removeClass("active");
          });
      },

      popupleftdashboard: function () {
          const updateSidebar = () => {
              if ($(window).width() >= 1200) {
                  $(".popup-dashboardleft-btn").removeClass("collapsed");
                  $(".popup-dashboardleft-section").removeClass("collapsed");
                  $(".brand-logo").removeClass("collapsed");
                  $(".rbt-main-content").removeClass("area-left-expanded");
                  $(".rbt-static-bar").removeClass("area-left-expanded");
              } else {
                  $(".popup-dashboardleft-section").addClass("collapsed");
                  $(".rbt-main-content").addClass("area-left-expanded");
                  $(".rbt-static-bar").addClass("area-left-expanded");
                  $(".brand-logo").addClass("collapsed");
              }
          };

          updateSidebar();
          $(window).on("resize", updateSidebar);

          $(".popup-dashboardleft-btn").on("click", function () {
              $(".popup-dashboardleft-btn, .popup-dashboardleft-section, .rbt-main-content, .rbt-static-bar, .brand-logo").toggleClass("collapsed area-left-expanded");
              setTimeout(() => chatenaiJs.initBlockWidth(), 500);
          });
      },

      popuprightdashboard: function () {
          const updateSidebar = () => {
              if ($(window).width() >= 1200) {
                  $(".popup-dashboardright-btn").removeClass("collapsed");
                  $(".popup-dashboardright-section").removeClass("collapsed");
                  $(".rbt-main-content").removeClass("area-right-expanded");
                  $(".rbt-static-bar").removeClass("area-right-expanded");
              } else {
                  $(".popup-dashboardright-section").addClass("collapsed");
                  $(".rbt-main-content").addClass("area-right-expanded");
                  $(".rbt-static-bar").addClass("area-right-expanded");
              }
          };

          updateSidebar();
          $(window).on("resize", updateSidebar);

          $(".popup-dashboardright-btn").on("click", function () {
              $(".popup-dashboardright-btn, .popup-dashboardright-section, .rbt-main-content, .rbt-static-bar").toggleClass("collapsed area-right-expanded");
              setTimeout(() => chatenaiJs.initBlockWidth(), 500);
          });
      },

      preloaderInit: function () {
          chatenaiJs._window.on("load", function () {
              $(".preloader").fadeOut("slow", function () {
                  $(this).remove();
              });
          });
      },

      showMoreBtn: function () {
          $.fn.hasShowMore = function () {
              return this.each(function () {
                  $(this).toggleClass("active").text($(this).parent(".has-show-more").hasClass("active") ? "Show Less" : "Show More");
              });
          };

          $(document).on("click", ".rbt-show-more-btn", function () {
              $(this).hasShowMore();
          });
      },

      backToTopInit: function () {
          const scrollTop = $(".rainbow-back-top");
          $(window).scroll(function () {
              const topPos = $(this).scrollTop();
              $(scrollTop).css("opacity", topPos > 150 ? "1" : "0");
          });

          $(scrollTop).on("click", function () {
              $("html, body").animate({ scrollTop: 0 }, 10);
              return false;
          });
      },

      headerSticky: function () {
          $(window).scroll(function () {
              $(".header-sticky").toggleClass("sticky", $(this).scrollTop() > 250);
          });
      },

      radialProgress: function () {
          $(".radial-progress").waypoint(function () {
              $(".radial-progress").easyPieChart({
                  lineWidth: 10,
                  scaleLength: 0,
                  rotate: 0,
                  trackColor: false,
                  lineCap: "round",
                  size: 220,
              });
          }, { triggerOnce: true, offset: "bottom-in-view" });
      },
  };

  // Initialize the application
  chatenaiJs.i();

})(window, document, jQuery);

// Bg flashlight
let cards = document.querySelectorAll('.bg-flashlight')
cards.forEach(bgflashlight => {
    bgflashlight.onmousemove = function(e){
        let x = e.pageX - bgflashlight.offsetLeft;
        let y = e.pageY - bgflashlight.offsetTop;

        bgflashlight.style.setProperty('--x', x + 'px');
        bgflashlight.style.setProperty('--y', y + 'px');
    }
});

// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Chat Box Reply
function generateAutoReply() {
    return `ChatenAI: I'm a dynamic chat bot!`;
  }

  function sendMessage() {
    const txtarea = document.getElementById('txtarea');
    const chatContainer = document.getElementById('chatContainer');
    let welcomeMessageIndex = 0;

    const welcomeMessages = [
      "Welcome to our chat! Feel free to ask any questions. Hello! How can I help you today? ",
      "Welcome to our chat! Feel free to ask any questions."
    ];

    const userMessage = txtarea.value.trim();
    if (userMessage === '') return;

    const userMessageElement = createEditableMessage('You', userMessage, 'author-speech', 'assets/images/team/team-01.jpg');
    appendMessage(userMessageElement);

    if (welcomeMessageIndex < welcomeMessages.length) {
      const welcomeMessageElement = createMessageWithReactions('ChatenAI', welcomeMessages[welcomeMessageIndex], 'ai-speech', 'assets/images/team/avater.png');
      appendMessage(welcomeMessageElement);
      welcomeMessageIndex++;
    } else {
      const autoReply = generateAutoReply();
      const autoReplyElement = createMessageWithReactions('ChatenAI', autoReply, 'ai-speech', 'assets/images/team/avater.png');
      appendMessage(autoReplyElement);
    }

    txtarea.value = '';
  }

  function createEditableMessage(title, message, speechClass, imgSrc) {
    const messageElement = createMessageElement(title, message, speechClass, imgSrc, true);
    return messageElement;
  }

  function createMessageWithReactions(title, message, speechClass, imgSrc) {
    const messageElement = createMessageElement(title, message, speechClass, imgSrc, false);
    return messageElement;
  }

  function createMessageElement(title, message, speechClass, imgSrc, isEditable) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-box ai-speech bg-flashlight ${speechClass}`;
    messageElement.innerHTML = `
      <div class="inner top-flashlight leftside light-xl">
        <div class="chat-section">
          <div class="author">
            <img class="w-100" src="${imgSrc}" alt="${title}">
          </div>
          <div class="chat-content">
            <h6 class="title">${title}</h6>
            <p class="mb--20 ${isEditable ? 'editable' : ''}" ${isEditable ? 'contenteditable="true"' : ''}>${message}</p>
            ${isEditable ? getEditButtons() : getReactionButtons()}
          </div>
        </div>
      </div>
    `;
    return messageElement;
  }

  function getEditButtons() {
    return `
      <div class="edit-actions">
        <button class="edit-btn btn-default btn-small btn-border" onclick="editMessage(this)"><i class="feather-edit"></i></button>
        <button class="save-regenerate-btn btn-default btn-small" onclick="saveAndRegenerateMessage(this)">Save & Regenerate</button>
        <button class="cancel-btn btn-default btn-small btn-border" onclick="cancelEdit(this)">Cancel</button>
      </div>
    `;
  }

  function getReactionButtons() {
    return `
      <div class="reaction-section">
        <div class="btn-grp">
            <div class="left-side-btn dropup">
                <button data-bs-toggle="modal" data-bs-target="#likeModal" class="react-btn btn-default btn-small btn-border"><i class="feather-thumbs-up"></i></button>
                <button data-bs-toggle="modal" data-bs-target="#dislikeModal" class="react-btn btn-default btn-small btn-border"><i class="feather-thumbs-down"></i></button>
                <button data-bs-toggle="modal" data-bs-target="#shareModal" class="react-btn btn-default btn-small btn-border"><i class="feather-share"></i></button>
                <button type="button" class="react-btn btn-default btn-small btn-border dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="feather-more-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#"><i class="feather-copy"></i> Copy</a></li>
                    <li><a class="dropdown-item" href="#"><i class="feather-tag"></i> Pin Chat</a></li>
                    <li><a class="dropdown-item" href="#"><i class="feather-file-text"></i> Rename</a></li>
                    <li><a class="dropdown-item delete-item" href="#"><i class="feather-trash-2"></i> Delete Chat</a></li>
                </ul>
            </div>
            <div class="right-side-btn">
                <button class="react-btn btn-default btn-small btn-border" onclick="regenerateMessage()">
                    <i class="feather-repeat"></i><span>Regenerate</span>
                </button>
            </div>
        </div>
      </div>
    `;
  }

  function appendMessage(messageElement) {
    const chatContainer = document.getElementById('chatContainer');
    const isAutoReply = messageElement.classList.contains('ai-speech');
  
    chatContainer.appendChild(messageElement);
  
    if (isAutoReply) {
      // Scroll down to reveal the auto-reply
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
  }

  function editMessage(button) {
    const chatContent = button.parentElement.parentElement.parentElement;
    const editable = chatContent.querySelector('.editable');
    editable.contentEditable = 'true';
    editable.focus();
  }

  function saveAndRegenerateMessage(button) {
    const chatContent = button.parentElement.parentElement.parentElement;
    const editable = chatContent.querySelector('.editable');
    const editedMessage = editable.textContent;
    editable.contentEditable = 'false';

    // Save the edited message (you can send it to a server, etc.)
    console.log("Saved message:", editedMessage);

    // Regenerate a new message
    const regeneratedMessage = generateAutoReply();
    const regeneratedMessageElement = createMessageWithReactions('ChatenAI', regeneratedMessage, 'ai-speech', 'assets/images/team/avater.png');
    appendMessage(regeneratedMessageElement);
  }

  function cancelEdit(button) {
    const chatContent = button.parentElement.parentElement.parentElement;
    const editable = chatContent.querySelector('.editable');
    editable.contentEditable = 'false';
    // Optionally, you can revert the content to the original state
  }

  function regenerateMessage() {
    const regeneratedMessage = generateAutoReply();
    const regeneratedMessageElement = createMessageWithReactions('ChatenAI', regeneratedMessage, 'ai-speech', 'assets/images/team/avater.png');
    appendMessage(regeneratedMessageElement);
  }

  const txtarea = document.getElementById('txtarea');
  if(null !== txtarea) {
    txtarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
    });
  };
