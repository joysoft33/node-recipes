DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `findAround`(
	IN inLatitude FLOAT,
	IN inLongitude FLOAT,
	IN inRadius INTEGER,
    IN inLimit INTEGER
    )
BEGIN

SELECT * FROM (

	SELECT
		u.id,
        u.email,
        u.name,
        u.isAdmin,
		u.address,
		X(u.location) AS latitude,
        Y(u.location) AS longitude,
		ROUND(p.radius, 2) AS radius,
		ROUND(p.distance_unit
			 * DEGREES(ACOS(COS(RADIANS(p.lat))
			 * COS(RADIANS(X(u.location)))
			 * COS(RADIANS(p.lng - Y(u.location)))
			 + SIN(RADIANS(p.lat))
			 * SIN(RADIANS(X(u.location))))), 2) AS distance
	FROM recipes.users AS u

	JOIN (
		SELECT  
			inLatitude AS lat,
			inLongitude AS lng,
			inRadius AS radius,
			111.045 AS distance_unit
	) AS p ON 1=1

	WHERE 
		X(u.location)
			BETWEEN p.lat  - (p.radius / p.distance_unit) 
				AND p.lat  + (p.radius / p.distance_unit)
	AND
		Y(u.location)
			BETWEEN p.lng - (p.radius / (p.distance_unit * COS(RADIANS(p.lat))))
				AND p.lng + (p.radius / (p.distance_unit * COS(RADIANS(p.lat))))
) AS d

WHERE distance <= radius
ORDER BY distance
LIMIT inLimit;
END$$
DELIMITER ;
