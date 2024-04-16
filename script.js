//Call this opennoiseform() function to load the form to print the 
//background color and image for the webpage based on the input. 
opennoiseform();
function opennoiseform() {
    const textValues = [];
    const form = document.createElement('form');

    function createInput(name, labelText, placeholderText) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'form-input')
        input.setAttribute('placeholder', placeholderText)
        input.setAttribute('required', '');
        input.name = name;
        const label = document.createElement('label');
        label.textContent = labelText;
        label.setAttribute('class', 'form-label');
        // Add the input and label to the form 
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
        form.appendChild(input);
        form.appendChild(document.createElement('br'));
        // Push the input element to the array 
        textValues.push(input);
    }
    // Create form inputs for each field 
    createInput('Red', 'Red', 'Red (0-255)');
    createInput('Green', 'Green', 'Green (0-255)');
    createInput('Blue', 'Blue', 'Blue (0-22)');
    createInput('Tiles', 'Tiles', 'Tiles (1-50)');
    createInput('Tilesize', 'TileSize', 'TileSize (1-20)');
    // Append the form to the document body 
    document.body.appendChild(form);
    // Create a button to submit the form 
    const submitButton = document.createElement('button');
    submitButton.setAttribute('class', 'submit-button')
    submitButton.textContent = 'Submit';
    submitButton.onclick = function () {
        // Collect values from form inputs 
        const values = textValues.map(input => input.value);
        const isEmpty = values.some(value => value.trim() === '');
        //If the values contains any empty fields which means 
        //if any form field is empty then we need to stop the operation and print the alert message. 
        if (isEmpty) {
            alert('Please fill out all text fields');
            return;
        }
        noiseApi(values); form.reset();
    }; // Append the submit button to the document body 

    document.body.appendChild(submitButton);
}
// This is my 2nd api call which will pass the form inputs to noise endpoint and 
//create the background effects. 
async function noiseApi(data) {
    try {
        console.log('colorapi', data)
        //set the data from the response array and assign it to the endpoint query parameters 
        const r = data[0];
        const g = data[1];
        const b = data[2];
        const t = data[3];
        const ts = data[4];
        const response = await fetch('https://php-noise.com/noise.php?r=${r}&g=${g}&b=${b}&tiles=${t}&tileSize=${ts}&borderWidth=5&mode=Around&json',
            { method: 'GET', headers: { accept: 'application/json', }, });
        // Check whether the response returned with success code or not. 
        //If its not success then we should throw the error. 
        if (!response.ok) { throw new Error(`Error! status: ${response.status}`); }
        // If the response is success we can parse the response and await is 
        //used to wait until the parsing operation completes. 
        //And store the response into variable result. 
        const result = await response.json();
        document.body.style.background = `url("${result.uri}") repeat center center`;
        //call the qrcodeApi function to print the qrcode in webpage. 
        qrcodeApi()
        return result;
    }
    catch (err) {
        console.log(err);
    }
}
