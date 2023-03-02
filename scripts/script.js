var backgrounds = getBackgrounds();
var strategies = getStrategies();
var backgroundPosition = 0;

$(document).ready(function() {
	$('.menu-toggle-container').on('click', function () {
		let navContainerEl = $('.nav-container');
		navContainerEl.toggle()
		
		let isHidden = navContainerEl.css('display') == 'none'
		let right = '30%';
		
		if (isHidden) {
			right = 0
		}

		$(this).css({
			right: right
		})
	})

	// is used to change bg of header element
	$('.change-background--js').on('click', function () {
		let step = $(this).attr('data-attr-step');
		let header = $('.header');

		// duhet te marrim backgrounds
		let isNext = step == 1;
		
		if (isNext) {
			if (backgroundPosition == 2) {
				backgroundPosition = 0;
			} else{
				backgroundPosition++;
			}
		} else {
			if (backgroundPosition == 0) {
				backgroundPosition = 2;
			} else {
				backgroundPosition--;
			}
		}

		let background = backgrounds[backgroundPosition];
		
		header.css({
			'background-image': formatBckgURL(background)
		});
	})


	// collapse qa questions
	$('.qa-header--js').on('click', function () {
		const ACTIVE_HEADER = 'active-header';
		const NORMAL_HEADER = 'qa-header';
		const PLUS_ICON = 'fa-plus';
		const MINUS_ICON = 'fa-minus';
		const HIDDEN = 'hidden';

		let isActive = $(this).attr('class').includes(ACTIVE_HEADER)
		let icon = $(this).find('.icon').find('i');
		let contentEl = $(this).next()

		if (isActive) {
			$(this).removeClass(ACTIVE_HEADER)
			$(this).addClass(NORMAL_HEADER)
			icon.removeClass(MINUS_ICON)
			icon.addClass(PLUS_ICON)
			contentEl.addClass(HIDDEN)
		} else {
			$(this).removeClass(NORMAL_HEADER)
			$(this).addClass(ACTIVE_HEADER)
			icon.removeClass(PLUS_ICON)
			icon.addClass(MINUS_ICON)
			contentEl.removeClass(HIDDEN)
		}
	})

	// contact us form
	$('#contact-us').on('submit', function (e) {
		e.preventDefault();
		$(this).validate({
			rules: {
				name: "required",
				email:  {
			      required: true,
			      email: true
			    },
			    message: "required"
			}
		})

		let data = $(this).serialize()

		$.ajax({
			url: "#",
			data: data,
			method: 'POST'
		}).done(function () {
			alert('Mesazhi juaj u dergua me sukses');
		}).fail(function () {
			alert('Dicka ka shkuar gabim ju lutem provoni me vone')
		})
	})

	$('.strategies-paginator-js').on('click', function () {
		let strategy_id = $(this).attr('data-attr-id');
		let strategy = getStrategyById(strategy_id)
		let strategyObj = Object.assign({}, strategy)

		let strategiesEl = $('#strategies');
		strategiesEl.find('.step--js').text(strategyObj.step);
		strategiesEl.find('.main-title--js').text(strategyObj.main_title);
		strategiesEl.find('.title-desc--js').text(strategyObj.title_desc);
		strategiesEl.find('.content--js').text(strategyObj.content);

		let paginatorsBtn = $('.strategies-paginator-js');
		paginatorsBtn.addClass('bg-lightgray darkgreen').removeClass('bg-green white')
		$(this).removeClass('bg-lightgray darkgreen').addClass('bg-green white')
	})
})

function getBackgrounds() {
	let response = $.get('scripts/backgrounds.json')
					.done(function (response) {
						backgrounds = response.backgrounds
						setBackgrounds(backgrounds);
					})	
	
	return backgrounds;
}


function getStrategies() {
	let response = $.get('scripts/strategies.json')
					.done(function (response) {
						strategies = response.strategies
						setStrategies(strategies);
					})
	
	return strategies;
}

function getStrategyById(id) {
	return strategies[id];
}

function setBackgrounds(backgrounds) {
	backgrounds = backgrounds;
}

function setStrategies(strategies) {
	strategies = strategies;
}

function formatBckgURL(url) {
	return 'url("' + url + '")';
}