<?php
header('Access-Control-Allow-Origin: *');

$conexion = new PDO('mysql:host=localhost;dbname=nba','root','');

if (isset($_GET)) {
    if (isset($_GET['conferencias'])) {
        $consulta = 'SELECT DISTINCT(Conferencia) FROM `equipos`;';
		$consulta = $conexion->prepare($consulta);
    }
    if (isset($_GET['conferencia'])) {
        $consulta = 'SELECT * FROM `equipos` WHERE UPPER(Conferencia) = UPPER(:conferencia);';
		$consulta = $conexion->prepare($consulta);
		$consulta->bindParam(':conferencia', $_GET['conferencia']);
    }
	if (isset($_GET['equipo'])) {
		$consulta = 'SELECT * FROM `jugadores` WHERE UPPER(Nombre_equipo) = UPPER(:equipo);';
		$consulta = $conexion->prepare($consulta);
		$consulta->bindParam(':equipo', $_GET['equipo']);
	}
	if (isset($_GET['jugadorF'])) {
		$consulta = 'SELECT * FROM `jugadores` WHERE Codigo = :jugador;';
		$consulta = $conexion->prepare($consulta);
		$consulta->bindParam(':jugador', $_GET['jugadorF']);
	}
	if (isset($_GET['jugadorS'])) {
		$consulta = 'SELECT * FROM `estadisticas` WHERE jugador = :jugador;';
		$consulta = $conexion->prepare($consulta);
		$consulta->bindParam(':jugador', $_GET['jugadorS']);
	}
	$consulta->execute();

$contenido = [];
while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
    $contenido[] = $fila;
}

echo json_encode($contenido);
}

