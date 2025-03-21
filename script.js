let elementsData = [];
let applicationsData = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    elementsData = data;
  })
  .catch(error => {
    console.error('Error loading elements data:', error);
  });

fetch('applications.json')
.then(response => response.json())
.then(data => {
  applicationsData = data;
})
.catch(error => {
   console.error('Error loading elements data:', error);
});

function normalizeElementName(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

document.getElementById('search').addEventListener('click', function() {
  const userInput = normalizeElementName(document.getElementById('element').value.trim());
  if (userInput) {
    const element = elementsData.find(el => el.name === userInput);
    if (element) {
      displayElementInfo(element);
      displayApplications(element);
    } else {
      const shows = document.querySelectorAll('.show');
      shows.forEach(show => {
        show.style.display = 'none';
      });
      document.getElementById('elementInfo').innerHTML = `
        <p>Element not found</p>
      `;
      setTimeout(() => {
        location.reload();
      }, 2500); 
      
    }
  } else {
    document.getElementById('elementInfo').innerHTML = '<p>Please enter an element name.</p>';
  }
});


function searchElement() {
  const userInput = document.getElementById('element').value.trim();
  let suggestionList = document.getElementById('suggestions');

  suggestionList.innerHTML = '';

  if(userInput.length === 0) return ;

  let filteredElements = elementsData.filter(el =>
     el.name.toLowerCase().startsWith(userInput.toLowerCase())
  );

  filteredElements.forEach(el => {
    let li = document.createElement('li');
    li.textContent = el.name;
    suggestionList.appendChild(li);
  });
}


function displayElementInfo(element) {
    const shows = document.querySelectorAll('.show');
        shows.forEach(show => {
            show.style.display = 'inline-block';
        });
  document.getElementById('an').textContent = element.atomicNumber || 'N/A';
  document.getElementById('am').textContent = element.atomicMass || 'N/A';
  document.getElementById('en').textContent = element.electronegativity || 'N/A';
  document.getElementById('bp').textContent = element.boilingPoint ? element.boilingPoint + ' K' : 'N/A';
  document.getElementById('mp').textContent = element.meltingPoint ? element.meltingPoint + ' K' : 'N/A';
  document.getElementById('sym').textContent = element.symbol || 'N/A';
  document.getElementById('os').textContent = element.oxidationStates || 'N/A';
  document.getElementById('ss').textContent = element.standardState || 'N/A';
  document.getElementById('gp').innerText = element.groupBlock || 'N/A' ;
  document.getElementById('ar').textContent = element.atomicRadius || 'N/A';
  document.getElementById('ie').textContent = element.ionizationEnergy || 'N/A';
  document.getElementById('ec').textContent = element.electronicConfiguration || 'N/A';
}

function displayApplications(element){
    
  let appDiv = document.getElementById('ap');
  appDiv.innerHTML = '';

  let answer = applicationsData[element.name];
  console.log(element);
  console.log(answer);

  if(answer) {
      let applicationsList = answer.applications.map(app=>`<li id="apps">${app}</li>`).join();
      appDiv.innerHTML=`
        <ul>${applicationsList}</ul>
      `
  }
}
