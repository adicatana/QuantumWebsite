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
					<li class="navbarElem">
						<a href='index.php?Home=true'>Home</a>
					</li>
					<li class="navbarElem">
						<a href='index.php?Maths=true'>Maths</a>
					</li>
					<li class="navbarElem">
						<a href='index.php?Physics=true'>Physics</a>
					</li>
					<li class="navbarElem">
						<a href='index.php?Architecture=true'>Architecture</a>
					</li>
					<li class="navbarElem">
						<a href='index.php?Algorithms=true'>Algorithms</a>
					</li>
					<li class="navbarElem">
						<a href='index.php?References=true'>References</a>
					</li>
				</ul> 
			</div>
		</div>
	</nav>

	<canvas id="background"></canvas>
	<script src="drops.js"></script>

	<?php
		foreach ($pages as $from=>$to) {
			if (isset($_GET[$from])) {
				changeTitle($from, $pages);
			}
		}
	?>
