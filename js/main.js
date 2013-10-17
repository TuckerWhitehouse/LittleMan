(function () {
    var register = 0;
    var position = 0;

    var getPosition = function () {
        var pos = (position<10?'0':'')+position;
        $('input[name="cnt"]').val(pos);
        return pos;
    };

    var writeLine = function writeLine(text) {
        $('.stage').append(text +'\n');
        $('.stage').scrollTop( $('.stage')[0].scrollHeight );
    }

    var method = function method(code) {
        var location = code.slice(1);
        var message;
        var next = position + 1;

        writeLine('> Command '+ getPosition() +' ['+ code +']');
        switch (code.slice(0, 1)) {
            case '0': // Break
                if (location == '00') {
                    message = 'Exit';
                    next = false;
                }
                break;
            case '1': // Add
                register += parseInt($('input[name="i'+ location +'"]').val() || 0);
                message = 'Add '+ parseInt($('input[name="i'+ location +'"]').val() || 0);
                break;
            case '2': // Subtract
                register -= parseInt($('input[name="i'+ location +'"]').val() || 0);
                message = 'Subtract '+ parseInt($('input[name="i'+ location +'"]').val() || 0);
                break;
            case '3': // Store
                $('input[name="i'+ location +'"]').val(register);
                message = 'Register Saved to '+ location;
                break;
            case '4': // ??
                break;
            case '5': // Load
                register = parseInt($('input[name="i'+ location +'"]').val() || 0);
                message = 'Loaded '+ register +' from '+ location;
                break;
            case '6': // Branch
                next = location;
                message = 'Branch to '+ location;
                break;
            case '7': // Branch Zero
                if (register === 0) {
                    next = location;
                }
                message = 'Branch to '+ location +' on zero';
                break;
            case '8': // Branch Positive
                if (register > 0) {
                    next = location;
                }
                message = 'Branch to '+ location +' on position'
                break;
            case '9': // I/O
                switch (location) {
                    case '01':
                        register = parseInt(prompt('Input'));
                        message = 'Input: ' + register;
                        break;
                    case '02':
                        message = 'Output: '+ register;
                        break;
                }
                break;
        }

        if (message) {
            writeLine(message +'\n');
        }
        $('input[name="acc"]').val(register);

        return parseInt(next);
    }

    var doStep = function (pos) {
        position = pos;
        $('.sidebar .input-group').removeClass('has-success');
        $('input[name="i'+ getPosition() +'"]').parent().addClass('has-success');
        var step = $('input[name="i'+ getPosition() +'"]').val();
        if (step && step.length === 3) {
            var next = method(step);
            if(next) {setTimeout(function() {doStep(next);}, 1000);}
        } else {
            console.warn('No Step & No Stop...');
        }
    }

    $('a[href="#play"]').on('click', function (e) {
        e.preventDefault();
        $('.stage').empty();
        doStep(0);
    });

    var loadExample1 = function () {
        $('.stage input').val(null);

        // Input
        $('input[name="i00"]').val('901');
        $('input[name="i01"]').val('399');
        $('input[name="i02"]').val('901');
        $('input[name="i03"]').val('398');
        $('input[name="i04"]').val('901');
        $('input[name="i05"]').val('397');

        //
        $('input[name="i06"]').val('599');
        $('input[name="i07"]').val('298');
        $('input[name="i08"]').val('815');

        //
        $('input[name="i09"]').val('599');
        $('input[name="i10"]').val('396');
        $('input[name="i11"]').val('598');
        $('input[name="i12"]').val('399');
        $('input[name="i13"]').val('596');
        $('input[name="i14"]').val('398');

        //
        $('input[name="i15"]').val('598');
        $('input[name="i16"]').val('297');
        $('input[name="i17"]').val('825');

        //
        $('input[name="i18"]').val('598');
        $('input[name="i19"]').val('396');
        $('input[name="i20"]').val('597');
        $('input[name="i21"]').val('398');
        $('input[name="i22"]').val('596');
        $('input[name="i23"]').val('397');
        $('input[name="i24"]').val('606');

        //
        $('input[name="i25"]').val('599');
        $('input[name="i26"]').val('902');
        $('input[name="i27"]').val('598');
        $('input[name="i28"]').val('902');
        $('input[name="i29"]').val('597');
        $('input[name="i30"]').val('902');

        // Exit
        $('input[name="i31"]').val('000');
    };
    loadExample1();
})();
