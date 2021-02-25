CREATE SCHEMA `xyz_inventory` ;

-- tables 
CREATE TABLE `user` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(100) DEFAULT NULL,
  `LastName` varchar(100) DEFAULT NULL,
  `UserName` varchar(256) DEFAULT NULL,
  `Password` mediumtext,
  `AccessToken` text,
  `Status` varchar(256) DEFAULT 'ACTIVE',
  PRIMARY KEY (`ID`)
  );

CREATE TABLE `product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `ProductTypeID` int DEFAULT NULL,
  `Cost` decimal(9,2) DEFAULT NULL,
  `Status` varchar(45) DEFAULT 'Active',
  `AddedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ExpiredDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `producttype` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(100) DEFAULT NULL,
  `AddedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ExpiredDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `order` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `Note` varchar(256) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `AddedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ExpiredDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `orderdetail` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `AddedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ExpiredDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `orderdeliverydetail` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `OrderDetailID` int DEFAULT NULL,
  `Address` varchar(256) DEFAULT NULL,
  `contact` int DEFAULT NULL,
  `AddedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ExpiredDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

-- FK_Product_ProductType

ALTER TABLE `xyz_inventory`.`product` 
ADD INDEX `FK_Product_ProductType_idx` (`ProductTypeID` ASC) VISIBLE;
;
ALTER TABLE `xyz_inventory`.`product` 
ADD CONSTRAINT `FK_Product_ProductType`
  FOREIGN KEY (`ProductTypeID`)
  REFERENCES `xyz_inventory`.`producttype` (`ID`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;
 
 -- FK_Order_User
 
 ALTER TABLE `xyz_inventory`.`order` 
ADD INDEX `FK_Order_User_idx` (`UserID` ASC) VISIBLE;
;
ALTER TABLE `xyz_inventory`.`order` 
ADD CONSTRAINT `FK_Order_User`
  FOREIGN KEY (`UserID`)
  REFERENCES `xyz_inventory`.`user` (`ID`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;
 
 -- FK_OrderDetail_Order
 
 ALTER TABLE `xyz_inventory`.`orderdetail` 
ADD INDEX `FK_OrderDetail_Order_idx` (`OrderID` ASC) VISIBLE;
;
ALTER TABLE `xyz_inventory`.`orderdetail` 
ADD CONSTRAINT `FK_OrderDetail_Order`
  FOREIGN KEY (`OrderID`)
  REFERENCES `xyz_inventory`.`order` (`ID`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;
  
  
 -- FK_OrderDetail_Product

ALTER TABLE `xyz_inventory`.`orderdetail` 
ADD INDEX `FK_OrderDetail_Product_idx` (`ProductID` ASC) VISIBLE;
;
ALTER TABLE `xyz_inventory`.`orderdetail` 
ADD CONSTRAINT `FK_OrderDetail_Product`
  FOREIGN KEY (`ProductID`)
  REFERENCES `xyz_inventory`.`product` (`ID`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;

  
-- FK_OrderDeliveryDetail_OrderDetail
  
  ALTER TABLE `xyz_inventory`.`orderdeliverydetail` 
ADD INDEX `FK_OrderDeliveryDetail_OrderDetail_idx` (`OrderDetailID` ASC) VISIBLE;
;
ALTER TABLE `xyz_inventory`.`orderdeliverydetail` 
ADD CONSTRAINT `FK_OrderDeliveryDetail_OrderDetail`
  FOREIGN KEY (`OrderDetailID`)
  REFERENCES `xyz_inventory`.`orderdetail` (`ID`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;



