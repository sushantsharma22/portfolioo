


  // Smooth Scroll
  const navLinks = document.querySelectorAll(".nav-links a, .hero-btn");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      
      if (targetId.startsWith("#")) {
        const targetSection = document.querySelector(targetId);
        const headerOffset = 60; // fixed header offset
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
  

  // Toggle Sidebar
  const menuIcon = document.getElementById("menu-icon");
  const sidebar = document.getElementById("sidebar");
  const body = document.body;

  menuIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Close Sidebar When Clicking Outside
  document.addEventListener("click", (e) => {
    if (!menuIcon.contains(e.target) && !sidebar.contains(e.target)) {
      sidebar.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Toggle Sidebar
  const exploreBtn = document.querySelector(".hero-btn");
  const textArea = document.querySelector(".hero-content"); // Container for the two lines of text
  let escapeCount = 0; // Track how many times the button escapes
  const originalPosition = { left: exploreBtn.offsetLeft, top: exploreBtn.offsetTop }; // Save original position
  
  function moveButton() {
    // Increment the hover escape count
    escapeCount++;
  
    // If the button has escaped 4 or 5 times, reset to its original position permanently
    if (escapeCount >= 6) {
      exploreBtn.style.position = "absolute";
      exploreBtn.style.left = `${originalPosition.left}px`;
      exploreBtn.style.top = `${originalPosition.top}px`;
  
      // Remove event listener to stop further movement
      exploreBtn.removeEventListener("mouseenter", moveButton);
      return;
    }
  
    // Get the bounding rectangle of the text area
    const textRect = textArea.getBoundingClientRect();
    const buttonWidth = exploreBtn.offsetWidth;
    const buttonHeight = exploreBtn.offsetHeight;
  
    // Define boundaries outside the text area
    const safeMargin = 20; // Add extra space around the text area
    const minX = textRect.left - safeMargin;
    const maxX = textRect.right + safeMargin - buttonWidth;
    const minY = textRect.bottom + safeMargin; // Only allow movement below the text
    const maxY = textRect.bottom + 100; // Constrain movement to a reasonable distance
  
    // Generate random positions within these bounds
    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;
  
    // Apply the new position to the button
    exploreBtn.style.position = "absolute";
    exploreBtn.style.left = `${randomX}px`;
    exploreBtn.style.top = `${randomY}px`;
  }
  
  // Add hover event listener to the button
  exploreBtn.addEventListener("mouseenter", moveButton);