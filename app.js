// Closure that generates new ID every single call:
function generateUniqueID() {
	let id = 0;
	return () => id++;
}
const getUniqueID = generateUniqueID();

// Cars Data:
const cars = [
	{
		id    : getUniqueID(),
		brand : 'Mazda',
		model : 'MAZDA6',
		color : 'Negro',
		year  : 2021,
		price : '$551,900',
		image :
			'https://www.mazda.mx/siteassets/mazda-mx/mycos-2021/mazda6/vlp/360/carbon-edition/mazda6-carbon-edition-ext-360-07-24.jpg'
	},
	{
		id    : getUniqueID(),
		brand : 'Mazda',
		model : 'MAZDA CX-9',
		color : 'Plateado',
		year  : 2021,
		price : '$703,900',
		image :
			'https://www.mazda.mx/siteassets/mazda-mx/mycos-2021/mazda-cx-9-v2/vlp/360/gris-titanio/mazda-cx9-2021-gris-ext-360-03-24.jpg'
	},
	{
		id    : getUniqueID(),
		brand : 'Mazda',
		model : 'MAZDA MX-5 RF',
		color : 'Rojo',
		year  : 2021,
		price : '$532,900',
		image :
			'https://www.mazda.mx/siteassets/mazda-mx/mycos-2021/mazda-mx-5-rf/vlp/360/rojo-brillante/mazda-mx5-rf-rojo-brillante-ext-360-05-24-s.jpg'
	}
];

//Select Elements:
const dataContainer = document.getElementById('car-data-container');
const carsArticles = document.getElementById('cars-articles');
const dataForm = document.getElementById('data-form');
const addCarButton = document.getElementById('add-car');

//Prevent Default:
dataForm.addEventListener('submit', function(e) {
	e.preventDefault();
});

//Button that displays form-data:
addCarButton.addEventListener('click', () => {
	showDataContainer();
	dataForm.addEventListener('submit', addCar);
});

//Function that Creates new Car data:
function addCar() {
	const brand = document.getElementById('brand').value;
	const model = document.getElementById('model').value;
	const price = document.getElementById('price').value;
	const image = document.getElementById('image').value;
	const year = document.getElementById('year').value;
	const color = document.getElementById('color').value;
	const car = { id: getUniqueID(), brand, model, price, image, year, color };
	cars.push(car);
	reset();
	dataForm.removeEventListener('submit', addCar);
}

//Function that Reads Cars data:
function renderData(cars) {
	const container = document.getElementById('cars-container');
	container.innerHTML = '';
	cars.forEach((car) => {
		const article = document.createElement('article');
		const brand = document.createElement('h3');
		const model = document.createElement('h4');
		const price = document.createElement('h5');
		const image = document.createElement('img');
		const year = document.createElement('h6');
		const color = document.createElement('h6');
		// article.classList.add('col-md-4', 'border', 'rounded', 'p-3');
		article.classList.add('col-md-4', 'shadow', 'p-3', 'mb-5', 'bg-body', 'rounded');

		brand.classList.add('text-center');
		model.classList.add('text-center');
		price.classList.add('text-center');
		image.classList.add('img-fluid');
		image.setAttribute('alt', `La marca es: ${car.brand} y el modelo es: ${car.model}`);

		brand.innerText = car.brand;
		model.innerText = car.model;
		price.innerText = car.price;
		image.src = car.image;
		year.innerHTML = `<i class="far fa-calendar-alt"></i> ${car.year}`;
		color.innerHTML = `<i class="fas fa-palette"></i> ${car.color}`;

		year.classList.add('mt-3');
		const editButton = document.createElement('button');
		const removeButton = document.createElement('button');
		editButton.innerHTML = '<i class="far fa-edit"></i> editar';
		removeButton.innerHTML = '<i class="fas fa-trash"></i> eliminar';

		editButton.classList.add('btn', 'btn-outline-success');
		removeButton.classList.add('btn', 'btn-outline-danger');

		editButton.addEventListener('click', () => showEditContainer(car.id));
		removeButton.addEventListener('click', () => removeCar(car.id));

		article.append(brand, model, price, image, year, color, editButton, removeButton);
		container.append(article);
	});
}

//Function that Updates Car data:
function editCar() {
	const id = document.getElementById('id');
	const newBrand = document.getElementById('brand').value;
	const newModel = document.getElementById('model').value;
	const newPrice = document.getElementById('price').value;
	const newImage = document.getElementById('image').value;
	const newYear = document.getElementById('year').value;
	const newColor = document.getElementById('color').value;
	const idx = cars.findIndex((car) => car.id === Number(id.value));
	cars[idx].brand = newBrand;
	cars[idx].model = newModel;
	cars[idx].price = newPrice;
	cars[idx].image = newImage;
	cars[idx].year = newYear;
	cars[idx].color = newColor;

	reset();
	dataForm.removeEventListener('submit', editCar);
}

//Function that deletes Car data:
function removeCar(id) {
	cars.splice(cars.findIndex((car) => car.id === id), 1);
	renderData(cars);
}

function showDataContainer() {
	carsArticles.classList.add('d-none');
	dataContainer.classList.remove('d-none');
}
function showEditContainer(id) {
	showDataContainer();
	const idx = cars.findIndex((car) => car.id === id);
	document.getElementById('id').value = cars[idx].id;
	document.getElementById('brand').value = cars[idx].brand;
	document.getElementById('model').value = cars[idx].model;
	document.getElementById('price').value = cars[idx].price;
	document.getElementById('image').value = cars[idx].image;
	document.getElementById('year').value = cars[idx].year;
	document.getElementById('color').value = cars[idx].color;
	dataForm.addEventListener('submit', editCar);
}

//Render initial data:
renderData(cars);

function reset() {
	renderData(cars);
	carsArticles.classList.remove('d-none');
	dataContainer.classList.add('d-none');
	dataForm.reset();
}
