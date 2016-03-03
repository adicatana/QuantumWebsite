
<!-- General site navigation bar -->
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	<!--<script src="navigator.js"></script>-->
	<link rel="stylesheet" href="style.css">
</head>


<body>
<?php
	$pages = array(
		"Home" => "home.html",
		"Maths" => "math.html",
		"Physics" => "physics.html",
		"Architecture" => "architecture.html"
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
					<li id="navBar1" onclick="deactivator('navBar','1234'); activator('navBar1');">
						<a href='navigator.php?Home=true'>Home</a>
					</li>
					<li id="navBar2" onclick="deactivator('navBar','1234'); activator('navBar2');">
						<a href='navigator.php?Maths=true'>Maths</a>
					</li>
					<li id="navBar3" onclick="deactivator('navBar','1234'); activator('navBar3');">
						<a href='navigator.php?Physics=true'>Physics</a>
					</li>
					<li id="navBar4" onclick="deactivator('navBar','1234'); activator('navBar4');">
						<a href='navigator.php?Architecture=true'>Architecture</a>
					</li>
					<li class="dropdown">
						<a href="#" 
							class="dropdown-toggle" 
							data-toggle="dropdown" 
							role="button" 
							aria-haspopup="true" 
							aria-expanded="false"> Dropdown <span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li><a href="#">Algorithm 1</a></li>
							<li><a href="#">Algorithm 2</a></li>
							<li><a href="#">Algorithm 3</a></li>
							<li role="separator" class="divider"></li>
							<li><a href="#">Algorithm 4</a></li>
							<li><a href="#">Algorithm 5</a></li>
						</ul>
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
