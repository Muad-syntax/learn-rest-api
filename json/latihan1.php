<?php
// $siswa = [
//     [
//         "nama" => "Maulana Ahmad Maliki",
//         "NISN" => "0040715755",
//         "email" => "mahmad52094@gmail.com"
//     ],
//     [
//         "nama" => "Mohammad Suaebummuad",
//         "NISN" => "0040715756",
//         "email" => "maulana085213@gmail.com"
//     ]
    
// ];

$dbh = new PDO('mysql:host=localhost;dbname=siperpus', 'root', '');
$db = $dbh->prepare('SELECT * FROM buku');
$db->execute();
$perpus = $db->fetchAll(PDO::FETCH_ASSOC);

$data = json_encode($perpus);
echo $data;
?>