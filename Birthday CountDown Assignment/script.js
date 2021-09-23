var main = document.createElement("div");
main.setAttribute("id", "main");

var wrapper = document.createElement("div");
wrapper.setAttribute("id", "wrapper");
main.append(wrapper);

var counterContent = document.createElement("div");
counterContent.setAttribute("id", "counter-content");
counterContent.innerText = "Happy Birthday CountDown";
wrapper.append(counterContent);

var divreset = document.createElement("button");
divreset.setAttribute("id", "btn-reset");
divreset.setAttribute("onClick", "hbCountDown(this)");
divreset.innerText = "Start Counter";
wrapper.append(divreset);

document.body.append(main);

function hbCountDown(e) {
	e.disabled=true;
	var counter = 10;
	divreset.innerText = "Running...";
	setTimeout(function () {
		console.log(counter); //10
		counterContent.innerText = counter;
		setTimeout(function () {
			counterContent.innerText = --counter;
			console.log(counter); //9
			setTimeout(function () {
				counterContent.innerText = --counter;
				console.log(counter); //8
				setTimeout(function () {
					counterContent.innerText = --counter;
					console.log(counter); //7
					setTimeout(function () {
						counterContent.innerText = --counter;
						console.log(counter); //6
						setTimeout(function () {
							counterContent.innerText = --counter;
							console.log(counter); //5
							setTimeout(function () {
								counterContent.innerText = --counter;
								console.log(counter); //4
								setTimeout(function () {
									counterContent.innerText = --counter;
									console.log(counter); //3
									setTimeout(function () {
										counterContent.innerText = --counter;
										console.log(counter); //2
										setTimeout(function () {
											counterContent.innerText = --counter;
											console.log(counter); //1
											setTimeout(function () {
												console.log("🥳Happy Birthday🥳");
												counterContent.innerText = "🥳Happy Birthday🥳";
												divreset.innerText = "⟳ Restart Counter";
												e.disabled=false;
											}, 1000)
										}, 1000)
									}, 1000)
								}, 1000)
							}, 1000)
						}, 1000)
					}, 1000)
				}, 1000)
			}, 1000)
		}, 1000)
	}, 100)
}