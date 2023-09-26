let server_url="http://localhost:3500/"

async function propagate_table_static(data, result_table_id, message_box_id)
{
    var result_table = document.getElementById(result_table_id);
    var message_box = document.getElementById(message_box_id);
    //Clear out everything currently in the table
    result_table.innerHTML = "";
    if(data.length < 1)
    {
        message_box.innerHTML = "No results";
        return;
    }
    //The rest of the function will now assume the first row has data

    const column_names = Object.keys(data[0]);
    var table_row = document.createElement("tr");
    for(var i = 0; i <  column_names.length; i++)
    {
        var table_header_entry = document.createElement("th");
        table_header_entry.setAttribute("class", "table_entry");
        var text_node = document.createTextNode(column_names[i]);
        table_header_entry.appendChild(text_node);
        table_row.appendChild(table_header_entry);
    }
    result_table.appendChild(table_row);
    for(var i = 0; i < data.length; i++)
    {
        var table_row = document.createElement("tr");
        for(var j = 0; j < column_names.length; j++)
        {
            var table_data_entry = document.createElement("td");
            table_data_entry.setAttribute("class", "table_entry");
            var text_node = document.createTextNode(data[i][column_names[j]]);
            table_data_entry.appendChild(text_node);
            table_row.appendChild(table_data_entry);
        }
        result_table.appendChild(table_row);
    }
    message_box.innerHTML = "";
}
async function propagate_table_with_actor_info(actor_id, actor_info_table_id, message_box_id)
{
    console.log("Hello");
    let response = await fetch(server_url + "get_actor_info/",{
        method: "GET",
        mode: "cors",
        headers: {
            "actor_id": actor_id
        },
    })
    let data = await response.text();
    if(JSON.parse(data).failure == 0)
    {
        propagate_table_static(JSON.parse(data).result_table, actor_info_table_id, message_box_id);
        document.getElementById(message_box_id).setAttribute("class", "content_box_success");
    }
    else
    {        
        document.getElementById(message_box_id).setAttribute("class", "content_box_failure");
    }
    document.getElementById(message_box_id).innerHTML = JSON.parse(data).message;

}
async function propagate_table_with_top_5_actors(message_box_id, top_5_actor_table_id, actor_info_table_id)
{    
    const message_box = document.getElementById(message_box_id);
    const result_table = document.getElementById(top_5_actor_table_id);
    
    let response = await fetch(server_url + "get_top_5_actors/",{
        method: "GET",
        mode: "cors"
    })
    let data = await response.json();

    //Clear out everything currently in the table
    result_table.innerHTML = "";
    
    if(data.result_table.length < 1)
    {
        message_box.innerHTML = "No results";
        return;
    }
    //The rest of the function will now assume the first row has data

    const column_names = Object.keys(data.result_table[0]);
    var table_row = document.createElement("tr");
    for(var i = 0; i <  column_names.length; i++)
    {
        var table_header_entry = document.createElement("th");
        table_header_entry.setAttribute("class", "table_entry");
        var text_node = document.createTextNode(column_names[i]);
        table_header_entry.appendChild(text_node);
        table_row.appendChild(table_header_entry);
    }
    result_table.appendChild(table_row);
    for(var i = 0; i < data.result_table.length; i++)
    {
        var table_row = document.createElement("tr");
        for(var j = 0; j < column_names.length; j++)
        {
            var table_data_entry = document.createElement("td");
            table_data_entry.setAttribute("class", "table_entry");
            var text_node = document.createTextNode(data.result_table[i][column_names[j]]);
            table_data_entry.appendChild(text_node);
            table_row.appendChild(table_data_entry);
        }
        var actor_id = data.result_table[i]['actor_id'];
        table_row.setAttribute("onclick", "propagate_table_with_actor_info(" + actor_id + ", \"" + actor_info_table_id + "\", \"" + message_box_id + "\")");
        result_table.appendChild(table_row);
    }
    
}
async function propagate_table_with_film_data(film_id, film_info_table_id, message_box_id)
{
    console.log("Hello")
    let response = await fetch(server_url + "get_film_info/",{
        method: "GET",
        mode: "cors",
        headers: {
            "film_id": film_id
        },
    })
    let data = await response.text();
    if(JSON.parse(data).failure == 0)
    {
        propagate_table_static(JSON.parse(data).result_table, film_info_table_id, message_box_id);
        document.getElementById(message_box_id).setAttribute("class", "content_box_success");
    }
    else
    {        
        document.getElementById(message_box_id).setAttribute("class", "content_box_failure");
    }
    document.getElementById(message_box_id).innerHTML = JSON.parse(data).message;
}
async function propagate_table_with_top_5_movies(message_box_id, result_table_id, film_info_table_id)
{
    const message_box = document.getElementById(message_box_id);
    const result_table = document.getElementById(result_table_id);
    
    let response = await fetch(server_url + "get_top_5_rented_films/",{
        method: "GET",
        mode: "cors"
    })
    let data = await response.json();

    //Clear out everything currently in the table
    result_table.innerHTML = "";
    
    if(data.result.length < 1)
    {
        message_box.innerHTML = "No results";
        return;
    }
    //The rest of the function will now assume the first row has data

    const column_names = Object.keys(data.result[0]);
    var table_row = document.createElement("tr");
    for(var i = 0; i <  column_names.length; i++)
    {
        var table_header_entry = document.createElement("th");
        table_header_entry.setAttribute("class", "table_entry");
        var text_node = document.createTextNode(column_names[i]);
        table_header_entry.appendChild(text_node);
        table_row.appendChild(table_header_entry);
    }
    result_table.appendChild(table_row);
    for(var i = 0; i < data.result.length; i++)
    {
        var table_row = document.createElement("tr");
        for(var j = 0; j < column_names.length; j++)
        {
            var table_data_entry = document.createElement("td");
            table_data_entry.setAttribute("class", "table_entry");
            var text_node = document.createTextNode(data.result[i][column_names[j]]);
            table_data_entry.appendChild(text_node);
            table_row.appendChild(table_data_entry);
        }
        var film_id = data.result[i]['film_id'];
        table_row.setAttribute("onclick", "propagate_table_with_film_data(" + film_id + ", \"" + film_info_table_id + "\", \"" + message_box_id + "\")"); 
        result_table.appendChild(table_row);
    }
}
async function propagate_table_with_film_list(film_name_id, actor_first_name_id, actor_last_name_id, genre_id, film_list_table_id, message_box_id)
{
    var film_name = document.getElementById(film_name_id).value;  
    var actor_first_name = document.getElementById(actor_first_name_id).value;
    var actor_last_name = document.getElementById(actor_last_name_id).value;
    var genre = document.getElementById(genre_id).value;

    let response = await fetch(server_url + "get_film_list/",{
        method: "GET",
        mode: "cors",
        headers: {
            "title": film_name,
            "actor_first_name": actor_first_name,
            "actor_last_name": actor_last_name,
            "genre": genre
        },
    })
    let data = await response.text();
    propagate_table_static(JSON.parse(data).result_table, film_list_table_id, message_box_id);
    if(JSON.parse(data).failure == 0)
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_success");
        propagate_table_static(JSON.parse(data).result_table, film_list_table_id, message_box_id);
    }
    else
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_failure");
    }
    document.getElementById(message_box_id).innerHTML = JSON.parse(data).message;
}
async function propagate_table_with_customer_list(customer_table_id, message_box_id, customer_id_id, customer_first_name_id, customer_last_name_id)
{
    let customer_id = document.getElementById(customer_id_id).value;
    let customer_first_name = document.getElementById(customer_first_name_id).value;
    let customer_last_name = document.getElementById(customer_last_name_id).value;

    let response = await fetch(server_url + "get_customer_list/",{
        method: "GET",
        mode: "cors",
        headers: {
            "customer_id": customer_id,
            "customer_first_name": customer_first_name,
            "customer_last_name": customer_last_name
        },
    })
    let data = await response.text();
    if(JSON.parse(data).failure == 0)
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_success");
        propagate_table_static(JSON.parse(data).result_table, customer_table_id, message_box_id);
    }
    else
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_failure");
    }
    document.getElementById(message_box_id).innerHTML = JSON.parse(data).message;
}

async function insert_customer_into_database(message_box_id, add_customer_store_id_id, add_customer_first_name_id, add_customer_last_name_id, add_customer_email_id, add_customer_address_id_id)
{
    var store_id = document.getElementById(add_customer_store_id_id).value;
    var first_name = document.getElementById(add_customer_first_name_id).value;
    var last_name = document.getElementById(add_customer_last_name_id).value;
    var email = document.getElementById(add_customer_email_id).value;
    var address_id = document.getElementById(add_customer_address_id_id).value;


    let response = await fetch(server_url + "add_customer/",{
        method: "POST",
        mode: "cors",
        headers: {
            "store_id": store_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "address_id": address_id
        },
    })
    let data = await response.text();
    if(JSON.parse(data).failure == 0)
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_success");
    }
    else
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_failure");
    }
    document.getElementById(message_box_id).innerHTML = JSON.parse(data).message;
}
async function update_customer_in_database(message_box_id, update_customer_id_id, update_customer_store_id_id, update_customer_first_name_id, update_customer_last_name_id, update_customer_email_id, update_customer_address_id_id)
{
    var customer_id = document.getElementById(update_customer_id_id).value;
    var store_id = document.getElementById(update_customer_store_id_id).value;
    var first_name = document.getElementById(update_customer_first_name_id).value;
    var last_name = document.getElementById(update_customer_last_name_id).value;
    var email = document.getElementById(update_customer_email_id).value;
    var address_id = document.getElementById(update_customer_address_id_id).value;


    let response = await fetch(server_url + "update_customer/",{
        method: "POST",
        mode: "cors",
        headers: {
            "customer_id": customer_id,
            "store_id": store_id,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "address_id": address_id
        },
    })
    let data = await response.text();
    if(JSON.parse(data).failure == 0)
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_success");
    }
    else
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_failure");
    }
    document.getElementById(message_box_id).innerHTML = JSON.parse(data).message;
}
async function delete_customer_in_database(message_box_id, delete_customer_id_id)
{
    var customer_id = document.getElementById(delete_customer_id_id).value;

    let response = await fetch(server_url + "delete_customer/",{
        method: "POST",
        mode: "cors",
        headers: {
            "customer_id": customer_id
        },
    })
    let data = await response.text();
    if(JSON.parse(data).failure == 0)
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_success");
    }
    else
    {
        document.getElementById(message_box_id).setAttribute("class", "content_box_failure");
    }
    document.getElementById(message_box_id).innerHTML = JSON.parse(data).message;
}