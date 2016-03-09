#!/usr/bin/php
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="bootstrap/bootstrap.min.css">
	<script src="jquery/jquery.min.js"></script>
	<script src="bootstrap/bootstrap.min.js"></script>
	<script src="navigator.js"></script>
	<link rel="stylesheet" href="style.css">
</head>

<body>
<?php
	$pages = array(
		"Home" => "home.html",
		"Maths" => "math.html",
		"Physics" => "physics.html",
		"Architecture" => "architecture.html",
		"Algorithms" => "algorithms.html",
		"References" => "references.html"		
	);

	function changeTitle($name, $pages) {
		include ($pages[$name]);
		
		$dom = new DOMDocument();
		$dom->loadHTMLfile("navigator.php");
		$element = $dom->getElementById('myid');
		$element -> $setAttribute('class', 'active');
	}
?>

	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" 
						class="navbar-toggle collapsed" 
						data-toggle="collapse" 
						data-target="#navbar" 
						aria-expanded="false" 
						aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Quantum Computing</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse navbar-nav navbar-right">
				<ul class="nav navbar-nav">
					<li id="Home">
						<a href='index.php?Home=true'>Home</a>
					</li>
					<li id="navBar2" onmouseover="deactivator('navBar','123456'); activator('navBar2');">
						<a href='index.php?Maths=true'>Maths</a>
					</li>
					<li id="navBar3" onmouseover="deactivator('navBar','123456'); activator('navBar3');">
						<a href='index.php?Physics=true'>Physics</a>
					</li>
					<li id="navBar4" onmouseover="deactivator('navBar','123456'); activator('navBar4');">
						<a href='index.php?Architecture=true'>Architecture</a>
					</li>
					<li id="navBar5" onmouseover="deactivator('navBar','123456'); activator('navBar5');">
						<a href='index.php?Algorithms=true'>Algorithms</a>
					</li>
					<li id="navBar6" onmouseover="deactivator('navBar','123456'); activator('navBar6');">
						<a href='index.php?References=true'>References</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	<?php
		foreach ($pages as $from=>$to) {
			if (isset($_GET[$from])) {
				changeTitle($from, $pages);
			}
		}
	?>
