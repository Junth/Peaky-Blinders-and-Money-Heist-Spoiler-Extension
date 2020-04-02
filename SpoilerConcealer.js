htmlTags = "SPANEMBIULOLI";

function hideNode(node) {
  node.textContent = "Peaky Blinders Spoiler Detected !!!";
  node.style.color = "red";
}

function hideSpoiler(node) {
  ancestor = node.parentNode;
  if (ancestor != null) {
    if (ancestor.parentNode != null && ancestor.tagName != "BODY") {
      ancestor = ancestor.parentNode;
    }

    imgs = ancestor.getElementsByTagName("img");
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].style.webkitFilter = "blur(15px)";
    }

    lists = ancestor.getElementsByTagName("li");
    for (var i = 0; i < lists.length; i++) {
      hideNode(lists[i]);
    }
  }

  if (node == null || node.parentNode == null) {
    return;
  }

  all_child = node.parentNode.children;
  for (var i = 0; i < all_child; i++) {
    var type = all_child[i].tagName;
    if (htmlTags.match(type) != null) {
      hideNode(all_child[i]);
    }
  }
  hideNode(node);
}

peakyBlindersKeywords = [
  "Peaky Blinders",
  "Peaky Blinders Spoilers",
  "Thomas Shelby",
  "Tommy Shelby",
  "Arthur Shelby",
  "Ada Shelby",
  "Polly Gray"
];
moneyHeistKeywords = [
  "Money Heist",
  "La Casa De Papel",
  "La Casa de Papel",
  "Money Heist Spoilers",
  "La Casa De Papel Spoilers"
];
keywords = [...peakyBlindersKeywords, ...moneyHeistKeywords];
console.log(keywords);

total = 0;

for (var ii = 0; ii < keywords.length; ii++) {
  o = $(`:contains(${keywords[ii]}):not(:has(:contains(${keywords[ii]})))`);
  console.log(o);
  for (var i = 0; i < o.length; i++) {
    if (!o[i].parentNode || o[i].parentNode.nodeName === "BODY") {
      continue;
    }
    hideSpoiler(o[i]);
    total++;
  }
}

if (total >= 8) {
  headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  for (var i = 0; i < headings.length; i++) {
    hideNode(headings[i]);
  }
}
