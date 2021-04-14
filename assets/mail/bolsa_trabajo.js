$(function() {
    $(
        "#contactForm2 input,#contactForm2 textarea,#contactForm2 button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var puesto = $("input#puesto").val();
            var archivo = $("input#archivo").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton2");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                url: "/assets/mail/contact_me.php", // Make sure this points to the contact_me.php file on your server
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    puesto: puesto,
                    archivo: archivo,
                    message: message,
                },
                cache: false,
                success: function() {
                    // Success message
                    $("#success2").html("<div class='alert alert-success'>");
                    $("#success2 > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success2 > .alert-success").append(
                        "<strong>El correo se ha enviado exitosamente. </strong>"
                    );
                    $("#success2 > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm2").trigger("reset");
                },
                error: function() {
                    // Fail message
                    $("#success2").html("<div class='alert alert-danger'>");
                    $("#success2 > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success2 > .alert-danger").append(
                        $("<strong>").text(
                            "Lo sentimos " +
                            firstName +
                            ", parece que el servicio no funciona. ¡Intente más tarde!"
                        )
                    );
                    $("#success2 > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm2").trigger("reset");
                },
                complete: function() {
                    setTimeout(function() {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function() {
    $("#success2").html("");
});