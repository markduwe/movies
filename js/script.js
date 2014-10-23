var $search = $('#search'),
	$searchUrl = 'https://api.themoviedb.org/3/search/movie?',
	$popularUrl = 'https://api.themoviedb.org/3/movie/top_rated?',
	$upcomingUrl = 'https://api.themoviedb.org/3/movie/upcoming?',
	$personUrl = 'https://api.themoviedb.org/3/person/',
	$api = 'api_key=48dc47e605dcddee1ae58d9f42c888ef&query=',
	$apiPerson = '?api_key=48dc47e605dcddee1ae58d9f42c888ef',
	$page = '&page=',
	$callback = '&callback=?',
	$append = '&append_to_response=casts,trailers,alternative_titles,images,releases,similar_movies'
	$appendPerson = '&append_to_response=credits'
	$movieId = 'https://api.themoviedb.org/3/movie/', 
	devKey = 'mzrya8mg9gmb75xkcyguqjn4',
	rtKey = 'r293fe3g5ktj37ms6hud5a3q';

$(function() {
	popular();
	upcoming();
	$search.on('click', function(e){
		e.preventDefault();
		search($('#searchMovies').val());
	});
	$(document).on('click', '.movie', function(event){
		var movieID = $(this).data('movieid');
		var movieYear = $(this).data('year');
		var movieTitle = $(this).data('title');
		getMovie(movieID, movieYear, movieTitle);
		event.stopPropagation();
	});
	$(document).on('click', '.back', function(event){
		search($('#searchMovies').val());
		event.stopPropagation();
	});
	$(document).on('click', '.castcrew', function(event){
		var personID = $(this).data('id');
		person(personID);
		event.stopPropagation();
	});
	$(document).on('click', '#check', function(event){
		var movieYear = $(this).data('year');
		var movieTitle = $(this).data('title');
		netflix(movieTitle, movieYear);
		event.stopPropagation();
	});
});

function popular() {
	$.getJSON($popularUrl+$api+$callback, function(data){
    	var res = '<div class="span6" data-page="'+data.page+'"><h1>Top Rated</h1>';
    	res += '<div id="popCarousel" class="carousel slide"><div class="carousel-inner">';
    	$.each(data.results, function(i,a) {
    		res += '<div class="item movie" data-movieid="'+a.id+'" data-year="'+new Date(a.release_date).getUTCFullYear()+'" data-title="'+a.original_title+'">';
    		if(a.poster_path == null) {
    			res += '<img src="https://cf2.themoviedb.org/assets/e6497422f20fa/images/no-poster-w92.jpg">';
    		} else {
    			res += '<img src="https://cf2.imgobject.com/t/p/w1280'+a.backdrop_path+'">';
    		}
    		res += '<div class="carousel-caption">';
    		res += '<h4>'+a.original_title+'</h4>';
    		res += '</div>';
    		res += '</div>';
    	});
    	res += '</div><a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a></div>';
    	$('#results').append(res);
    	$('.item:first-child').addClass('active');
    });	
}

function upcoming() {
	$.getJSON($upcomingUrl+$api+$callback, function(data){
    	var res = '<div class="span6" data-page="'+data.page+'"><h1>Upcoming</h1>';
    	res += '<div id="mupCarousel" class="carousel slide"><div class="carousel-inner">';
    	$.each(data.results, function(i,a) {
    		res += '<div class="item movie" data-movieid="'+a.id+'" data-year="'+new Date(a.release_date).getUTCFullYear()+'" data-title="'+a.original_title+'">';
    		if(a.poster_path == null) {
    			res += '<img src="https://cf2.themoviedb.org/assets/e6497422f20fa/images/no-poster-w92.jpg">';
    		} else {
    			res += '<img src="https://cf2.imgobject.com/t/p/w1280'+a.backdrop_path+'">';
    		}
    		res += '<div class="carousel-caption">';
    		res += '<h4>'+a.original_title+'</h4>';
    		res += '</div>';
    		res += '</div>';
    	});
    	res += '</div><a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a></div>';
    	$('#results').append(res);
    	$('.item:first-child').addClass('active');
    });	
}
	
function search(str) {
	$.getJSON($searchUrl+$api+str+$page+'1'+$callback, function(data){
    	var res = '<div class="span12" data-page="'+data.page+'">';
    	res += '<div class="row"><div class="span2"><h4>Poster</h4></div><div class="span5"><h4>Title</h4></div><div class="span3"><h4>Release Date</h4></div><div class="span2"><h4>Popularity</h4></div></div>';
    	$.each(data.results, function(i,a) {
    		res += '<div class="row movie" data-movieid="'+a.id+'" data-year="'+new Date(a.release_date).getUTCFullYear()+'" data-title="'+a.original_title+'">';
    		res += '<div class="span2">';
    		if(a.poster_path == null) {
    			res += '<img src="https://cf2.themoviedb.org/assets/e6497422f20fa/images/no-poster-w92.jpg" class="img-rounded">';
    		} else {
    			res += '<img src="https://cf2.imgobject.com/t/p/w92'+a.poster_path+'" class="img-rounded">';
    		}
    		res += '</div>';
    		res += '<div class="span5">';
    		res += a.original_title;
    		res += '</div>';
    		res += '<div class="span3" class="date">';
    		res += new Date(a.release_date).getUTCFullYear();
    		res += '</div>';
    		res += '<div class="span2" class="date">';
    		res += a.popularity;
    		res += '</div>';
    		res += '</div>';
    	});
    	res += '</div>';
    	$('#results').html(res);
    });	
}

function getMovie(str, year, title) {
	$('#searchMovies').val(title)
	$.getJSON($movieId+str+'?'+$api+$append+$callback, function(data){
    	var movie = '<div class="span12">';
    	movie += '<div class="row">';
    	movie += '<div class="span12">';
    	movie += '<a class="btn back">&laquo; Back to search</a>'
    	movie += '</div>'
    	movie += '</div>';
    	movie += '<div class="row" data-imdb="'+data.imdb_id+'">';
    	movie += '<div class="span12">';
    	movie += '<div class="hero-unit" style="background: url(https://cf2.imgobject.com/t/p/w780'+data.backdrop_path+');">';
    	movie += '<h1>'+data.original_title+'</h1>';
    	movie += '<h4><em>'+data.tagline+'</em></h4>';
    	movie += '</div>';
    	movie += '</div>';
    	movie += '<div class="span2">';
    	movie += '<h5>Poster</h5>';
    	if(data.poster_path == null) {
    		movie += '<img src="https://cf2.themoviedb.org/assets/e6497422f20fa/images/no-poster-w185.jpg" class="img-rounded">';
    	} else {
	    	movie += '<img src="https://cf2.imgobject.com/t/p/w185'+data.poster_path+'" class="img-rounded">';
    	}
    	if(exists(data.belongs_to_collection)) {
	    	movie += '<h5>Part of</h5>';
	    	movie += '<img src="https://cf2.imgobject.com/t/p/w185'+data.belongs_to_collection.poster_path+'" class="img-rounded">';	 
	    	movie += '<p>'+data.belongs_to_collection.name+'</p>';   	
    	}
    	movie += '<h5>Released</h5>';
    	$.each(data.releases.countries, function(i,a) {
    		movie += '<p class="'+a.iso_3166_1+' flag"></span> <small>'+Date.parse(a.release_date, 'yyyy-M-d').toString('ddd, d MMM, yyyy')+'</small></p>'
    	});
    	movie += '</div>';
    	movie += '<div class="span8">';
    	movie += '<h5>Overview</h5>';
    	movie += '<p class="lead">'+data.overview+'</p>';
    	movie += '<div class="row">';
    	movie += '<div class="span4">';
    	movie += '<h5>Crew</h5>';
    	$.each(data.casts.crew, function(i,a) {
    		if(a.profile_path == null) {
    			movie += '<div class="row castcrew" data-id="'+a.id+'"><div class="span1"><img src="https://cf2.themoviedb.org/assets/e6497422f20fa/images/no-poster-w45.jpg" class="img-rounded"></div><div class="span3"><strong>'+a.job+'</strong>:<br/>'+a.name + '</div></div>';
    		} else {
    			movie += '<div class="row castcrew" data-id="'+a.id+'"><div class="span1"><img src="https://cf2.imgobject.com/t/p/w45'+a.profile_path+'" class="img-rounded"></div><div class="span3"><strong>'+a.job+'</strong>:<br/>'+a.name + '</div></div>';
    		}
    	});
    	movie += '</div>';
    	movie += '<div class="span4">';
    	movie += '<h5>Cast</h5>';
    	$.each(data.casts.cast, function(i,a) {
    		if(a.profile_path == null) {
	    		movie += '<div class="row castcrew" data-id="'+a.id+'"><div class="span1"><img src="https://cf2.themoviedb.org/assets/e6497422f20fa/images/no-poster-w45.jpg" class="img-rounded"></div><div class="span3"><strong>'+a.character+'</strong>:<br/>'+a.name + '</div></div>';
	    	} else {
	    		movie += '<div class="row castcrew" data-id="'+a.id+'"><div class="span1"><img src="https://cf2.imgobject.com/t/p/w45'+a.profile_path+'" class="img-rounded"></div><div class="span3"><strong>'+a.character+'</strong>:<br/>'+a.name + '</div></div>';
	    	}
    	});
    	movie += '</div>';
    	movie += '</div>';
    	movie += '</div>';
    	movie += '<div class="span2">';
    	movie += '<h5>Production</h5>';
    	$.each(data.production_companies, function(i,a) {
    		movie += a.name+'<br />';
    	});
    	movie += '<h5>Genres</h5>';
    	$.each(data.genres, function(i,a) {
    		movie += a.name+'<br />';
    	});
    	movie += '<h5>Budget</h5>';
    	movie += '$'+addCommas(data.budget);
    	if(exists(data.revenue)){
    		movie += '<h5>Revenue</h5>';
    		movie += '$'+addCommas(data.revenue);
    	}
    	movie += '<div id="nfMovie"><a class="btn" id="check" data-year="'+year+'" data-title="'+title+'">Check Availability</a></div>';
    	movie += '<div id="nfMovieStuff">';
    	movie += '</div>';
    	movie += '</div>';
    	movie += '</div>';
    	movie += '<div class="row">';
    	movie += '<div class="span12">';
    	movie += '<h5>You might also like</h5>';
    	movie += '<ul class="thumbnails">';
    	$.each(data.similar_movies.results, function(i,a) {
    		movie += '<li class="span2"><div class="thumbnail"><img src="https://cf2.imgobject.com/t/p/w92'+a.poster_path+'" class="img-rounded"></div></li>';
    		if ( i == 5 ) return false;
    	});
    	movie += '</ul>'
    	movie += '</div>'
    	movie += '</div>';
//    	movie += '<div class="row">';
//    	movie += '<div class="span12">';
//    	movie += '<h5>Posters</h5>';
//    	$.each(data.images.posters, function(i,a) {
//    		movie += '<li class="span1 thumbnail"><img src="https://cf2.imgobject.com/t/p/w185'+a.file_path+'" class="img-rounded"></li>';
//    	});
//    	movie += '</div>'
//    	movie += '</div>';
    	movie += '<div class="row">';
    	movie += '<div class="span12">';
    	movie += '<h5>Trailers</h5>';
    	movie += '<ul class="thumbnails">';
    	$.each(data.trailers.youtube, function(i,a) {
    		movie += '<li class="span4 thumbnail"><iframe src="https://www.youtube.com/embed/'+a.source+'?rel=0" frameborder="0" allowfullscreen></iframe></li>';
    	});
    	movie += '</ul>'
    	movie += '</div>'
    	movie += '</div>';
    	movie += '<div class="row">';
    	movie += '<div class="span12">';
    	movie += '<a class="btn back">&laquo; Back to search</a>'
    	movie += '</div>'
    	movie += '</div>';
    	movie += '</div>';
    	movie += '</div>';
    	$('#results').html(movie);	
    });
}

function netflix(title, year) {
    var nfTitle = escape(title);
    var netflix = "https://odata.netflix.com/Catalog/Titles?$filter=Name%20eq%20%27"+nfTitle+"%27%20and%20ReleaseYear%20eq%20"+year+"&$format=json&$callback=net";
    $('#nfMovie').html('<img src="img/ajax-loader.gif">');
    $.ajax({
    	dataType: "jsonp",
    	url: netflix,
    	jsonpCallback: "net",
    	success: function(data){
	    	$.each(data.d.results, function(i,a) {
	    		movie = a.BoxArt.MediumUrl;
	    		NetflixApiId = a.NetflixApiId;
	    		MovieId = a.Id;
	    		AvailableInstant = a.Instant.Available;
	    		AvailableDVD = a.Dvd.Available;
	    		title = a.Name
	    	});
	    	$('#nfMovieStuff').html('<div class="btn-group"></div>');
	    	if(AvailableInstant == true){
		    	$('#nfMovieStuff .btn-group').append('<a id="play" class="btn btn-mini btn-primary" title="instant play '+title+'" href=javascript:playInstant("'+NetflixApiId+'","'+AvailableInstant+'","'+MovieId+'");>Play</a>');
		    	$('#nfMovieStuff').addClass('instant');
	    	}
	    	if(AvailableDVD == true){
		    	$('#nfMovieStuff .btn-group').append('<a id="queue" class="btn btn-mini btn-info" title="add '+title+' to your queue" onclick=addQueue("'+NetflixApiId+'","'+MovieId+'")>Queue</a>');
		    	$('#nfMovieStuff').addClass('queue');
	    	}
	    	$('#nfMovie').html('<img src="'+movie+'" alt="">');

	    	$('#play').live('click', function(){
		    	playInstant(NetflixApiId,AvailableInstant,MovieId)
	    	});
	    }
	});	
}

function companies(str) {
	
}

function person(str) {
	$.getJSON($personUrl+str+$apiPerson+$appendPerson+$callback, function(data){
		var movie = '<div class="span12">';
    	movie += '<div class="row">';
    	movie += '<div class="span12">';
    	movie += '<a class="btn back">&laquo; Back to search</a>'
    	movie += '</div>'
    	movie += '</div>';
    	movie += '<div class="row">';
    	movie += '<div class="span2">';	
    	if(data.profile_path == null) {
    		movie += '<p><img src="https://cf2.themoviedb.org/assets/e6497422f20fa/images/no-poster-w185.jpg" class="img-rounded"></p>';
    	} else {
	    	movie += '<p><img src="https://cf2.imgobject.com/t/p/w185'+data.profile_path+'" class="img-rounded"></p>';
    	}
    	movie += '<p><strong>Born</strong>: '+Date.parse(data.birthday, 'yyyy-M-d').toString('ddd, d MMM, yyyy')+' in '+data.place_of_birth+'</p>';
    	if(data.deathday != '') {
	    	movie += '<p><strong>Died</strong>: '+Date.parse(data.deathday, 'yyyy-M-d').toString('ddd, d MMM, yyyy')+'</p>';
    	}
		movie += '</div>';	
    	movie += '<div class="span7">';
    	movie += '<h1>'+data.name+'</h1>';
    	if(data.profile_path == null) {
    		movie += 'No information';
    	} else {
    		movie += data.biography.replace(/\n/g, "<br/>");
		}
		movie += '</div>';	
    	movie += '<div class="span3">';	
    	if(data.credits.cast != null) {
    		movie += '<h5>Actor</h5>'
	    	$.each(data.credits.cast, function(i,a) {
	    		movie += '<div class="media">';
	    		movie += '<a class="pull-left"><img src="https://cf2.imgobject.com/t/p/w92'+a.poster_path+'" width="50"></a>';
	    		movie += '<div class="media-body"><h6 class="media-heading">'+a.original_title+'</h6>'+a.character+'</div>';
	    		movie += '</div>';
	    	});
    	}
    	if(data.credits.crew != null) {
    		movie += '<h5>Crew</h5>'
	    	$.each(data.credits.crew, function(i,a) {
	    		movie += '<div class="media">';
	    		movie += '<a class="pull-left"><img src="https://cf2.imgobject.com/t/p/w92'+a.poster_path+'" width="50"></a>';
	    		movie += '<div class="media-body"><h6 class="media-heading">'+a.original_title+'</h6>'+a.job+'</div>';
	    		movie += '</div>';
	    	});
    	}
		movie += '</div>';	
		movie += '</div>';	
		movie += '</div>';
		$('#results').html(movie);
	});
}

function playInstant(NetflixApiId,Available,MovieId){
	var playThis = NetflixApiId.substring(45);
	nflx.openPlayer('https://api.netflix.com/catalog/movie/' + playThis, 0, 0, devKey);
}
function addQueue(NetflixApiId,Available,MovieId){
	var addThis = NetflixApiId.substring(45);
	var getX = $(window).width()/2;
	var getY = $(window).height()/2;
	getX = getX - 200;
	getY = getY;
	nflx.addToQueue('https://api.netflix.com/catalog/movie/' + addThis, getX, getY, devKey, 'devKey', 'addMe');
}


function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function exists(data){
	if(!data || data==null || data=='undefined' || typeof(data)=='undefined') return false;
	else return true;
}
//end