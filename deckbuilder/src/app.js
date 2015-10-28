import Aliens from '../../cards/monsters/alien';
import Angels from '../../cards/monsters/angel';
import Beasts from '../../cards/monsters/beast';
import Demons from '../../cards/monsters/demon';
import Dragons from '../../cards/monsters/dragon';
import Fusions from '../../cards/monsters/fusion';
import Humans from '../../cards/monsters/human';
import Mechs from '../../cards/monsters/mech';
import Spells from '../../cards/spells/spells';
import Traps from '../../cards/traps/traps';

$('.container').append($('<code>').text(JSON.stringify(Aliens, null, 2)));

/*
$('.container').append($('<ul>'));
Aliens.forEach(function (alien) {
    $('.container').append($('<li>').text(alien.name));
});
*/