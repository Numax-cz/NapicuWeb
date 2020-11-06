<?php
$db = new mysqli("localhost", "NumaxDB", "NumaxIsYourMuM", "NumaxDB");

if($db->connect_error){
  die("Chyba při připojování na DB: " . $conn->connect_error);
}

if($_GET["admin"] == "nub"){
    $dbvylsedek = $db->query("SELECT * FROM `IPLog`");
    ?>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
<table>
  <tr>
    <th>ID</th>
    <th>IP</th>
    <th>Datum první návštěvy</th>
    <th>Stát</th>
  </tr>
<?php
if ($dbvylsedek->num_rows > 0) {

    while($row = $dbvylsedek->fetch_assoc()) {
        ?>
        <tr>  
        <td> <?php echo $row["ID"]; ?></td>
        <td> <?php echo $row["IP"]; ?></td>
        <td> <?php echo $row["FirstVisit"]; ?></td> 
        <td> <?php echo $row["Stat"]; ?></td>
        </tr>
        <?php
    }
}
?>


</table>
    <?php
    die();
}

$dbvylsedek = $db->query("SELECT `IP`,`ID`, `VisitCount`  FROM `IPLog` WHERE `IP` LIKE '".$_SERVER["HTTP_CF_CONNECTING_IP"]."'");

if($dbvylsedek->num_rows < 1){
    $db->query("INSERT INTO `IPLog`(`IP`, `Stat`) VALUES ('".$_SERVER["HTTP_CF_CONNECTING_IP"]."', '".$_SERVER["HTTP_CF_IPCOUNTRY"]."')");
}else{
  while($row = $dbvylsedek->fetch_assoc()) {
    $AktualniCas = date('Y-m-d H:i:s');
    $PocetNavstev = $row["VisitCount"] + 1;

    $db->query("UPDATE `IPLog` SET `LastVisit`='".$AktualniCas."',`VisitCount`='".$PocetNavstev."' WHERE `ID` LIKE '".$row['ID']."'");
  }
}