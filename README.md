# pruebaGPS

Tabla Persona

GET
Ruta: api/personas

POST
Ruta: api/personas

Json



{
    "Nombre": "Erick"
}




PUT
Ruta: api/personas

Json


{
    "ID": 1,
    "NombreNew": "Erick",
    "NombreOld": "Juan"
}




Delete  
(en este caso el ID es FK de PersonaID en la tabla de tarea, si hay registros en la tabla tareas para ese ID no se podra borrar)

Ruta: api/personas

Json



{
    "ID": 3,
    "Nombre": "Erick"
}



*************************************************************
Tabla Tarea

GET
Ruta: api/tareas

POST
Ruta: api/tareas

    {
        "Descripcion": "ingreso2",
        "PersonaID": 1,
        "Fecha": "2023-05-10T06:00:00.000Z",
        "Valor": 150,
        "Duracion": "00:40:00"
    }



PUT
Ruta: api/tareas

Es necesario pasar los parámetros ID y PersonaID para encontrar la tarea, y los valores nuevos.
Se puede enviar de la siguiente manera


    {
        "ID": 1,
        "Descripcion": "Revision 1",
        "PersonaID": 1,
        "Fecha": "2023-05-10T08:00:00.000Z",
        "Valor": 110,
        "Duracion": "00:49:00"
    }
    
    
    
O solo los que se desean actualizar 

    {
        "ID": 1,
        "PersonaID": 1,
        "Descripcion": "Revision 3"
    }


DELETE
Ruta: api/tareas


    {
        "ID": 2,
        "PersonaID": 1
    }
    
    


*********************************
Suma de Valor y Horas 

Ruta: /api/resumenvalor/2

Parámetro=2

*************************************
Detalle de tareas por Fecha y Persona

Ruta: /api/detalle



{
    "PersonaID": 3,
    "Fecha": "2023-05-11"
}





