<?php
    header("Access-Control-Allow-Origin: *");
    require_once __DIR__ . '/phpmailer/PHPMailerAutoload.php';

    if(!isset($_POST["special-name"]) || $_POST["special-name"] === "" || !isset($_POST["special-phone"]) || $_POST["special-phone"] === "" || !isset($_POST["special-plan"]) || $_POST["special-plan"] === ""){
        echo 0;
        exit();
    }
    
    $email = "info@thewellbox.com.tr";
    $name = "Yetkili - Well Box";

    $body = 'Sayın yetkili,<br><br>' . $_POST["special-name"] . ' bir teklif talebinde bulundu.<br><br>Müşteri Bilgileri:<br><br>Telefon: ' . $_POST["special-phone"] . '<br>Beslenme Planı: ' . $_POST["special-plan"] . '<br><br>İyi çalışmalar dileriz.';
    $response = sendEmail($email, $name, $body, []);
    echo ($response == 1) ? 1 : 0;

    function sendEmail($email, $name, $body, $attachment = null) {
			
        try {
            $mail = new PHPMailer();
            $mail->IsSMTP();
    
            $mail->SMTPAuth = true;
            $mail->Host = 'mail.thewellbox.com.tr';
            $mail->Port = 587;
            $mail->Username = 'noreply@thewellbox.com.tr';
            $mail->Password = 'HkV48neP06';
    
            $mail->SetFrom("thewellbox", 'Info');
            $mail->AddAddress($email, $name);
            $mail->CharSet = 'UTF-8';
            $mail->Subject = 'Anasayfa Form';
            $mail->IsHTML(true);
            $mail->MsgHTML($body);
    
            if(is_array($attachment)) {
                
                for($i = 0; $i < count($attachment); $i++) {
                    
                    $mail->AddAttachment($attachment[$i]["path"], $attachment[$i]["name"], 'base64', $attachment[$i]["type"]);
    
                }
    
            }
    
            if($mail->Send()) return 1; else return 0; 
        
        }
        catch (phpmailerException $e) {
            
          return $e->errorMessage();
          
        } 
        catch (Exception $e) {
            
          return $e->getMessage(); 
          
        }
        
    }
    
?>