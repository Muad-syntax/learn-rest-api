function searchMoves() {
    $('#move-list').html('')
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'ed8d3ae6',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {

                let moves = result.Search

                $.each(moves, function (i, data) {
                    $('#move-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                            <img class="card-img-top" src="${data.Poster}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${data.Title}</h5>
                                    <span class="card-subtitle mb-2 text-muted">${data.Year}</span>
                                    <span class="card-subtitle mb-2 text-muted">${data.Type}</span><br>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">Play</a>
                                </div>
                            </div>
                        </div>
                    `)
                })

                $('#search-input').val('')

            } else {
                $('#move-list').html(`
                    <div class="col">
                        <h1 class="text-center">${result.Error}</h1>
                    </div>
                `)
            }
        }
    })
}

$('#search-button').on('click', function () {
    searchMoves()
}) 

$('#search-input').on('keyup', function(e){
    if(e.keyCode === 13){
        searchMoves()
    }
})

$('#move-list').on('click','.see-detail', function(){
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'ed8d3ae6',
            'i': $(this).data('id')
        },
        success : function (move) {
            if(move.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${move.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>${move.Title}</h3></li>
                                    <li class="list-group-item"><b>Genre:</b> ${move.Genre}</li>
                                    <li class="list-group-item"><b>Plot:</b> ${move.Plot}</li>
                                    <li class="list-group-item"><b>Director:</b> ${move.Director}</li>
                                    <li class="list-group-item"><b>Released:</b> ${move.Released}</li>
                                    <li class="list-group-item"><b>Rating:</b> ${move.imdbRating}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                
                `)
            }
        }
    })
})