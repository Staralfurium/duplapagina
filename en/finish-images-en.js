// The English page deliberately uses exact copies of the approved Portuguese
// finishing images. Distinct filenames prevent a visitor's cached older assets
// from being shown here.
(() => {
  const approvedImages = [
    "../assets/finish-gold-foil-pt.png",
    "../assets/finish-soft-touch-pt.png",
    "../assets/finish-spot-uv-pt.png",
    "../assets/finish-high-emboss-pt.png",
  ];

  document.querySelectorAll(".finish-showcase .finish-photo img").forEach((image, index) => {
    if (approvedImages[index]) image.src = approvedImages[index];
  });
})();
