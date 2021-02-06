<?php
/**
 * @file
 * Horizontal Forms administration functions.
 */

/**
 * Form constructor for Compact Forms settings.
 */
function horizontal_forms_admin_form($form, &$form_state) {
  $form['horizontal_forms_ids'] = array(
    '#type' => 'textarea',
    '#title' => t('Form CSS IDs'),
    '#rows' => 20,
    '#default_value' => variable_get('horizontal_forms_ids', ''),
    '#description' => t('Enter the form IDs of the forms to display horozintally. One per line.'),
  );
  
  /** Some problems with this bit causing some panel forms and content forms (after jquery update) to go wonky)
  $form['horizontal_forms_all_admin'] = array(
    '#type' => 'checkbox',
    '#title' => t('Apply to all admin forms'),
    '#default_value' => variable_get('horizontal_forms_all_admin', 'N'),
    '#description' => t('This setting will ignore the "Form CSS IDs" field above and apply to all admin forms.'),
  );  **/

  /** Some problems with this bit causing some panel forms and content forms (after jquery update) to go wonky)
  $form['horizontal_forms_all_public'] = array(
    '#type' => 'checkbox',
    '#title' => t('Apply to all public forms'),
    '#default_value' => variable_get('horizontal_forms_all_public', 'N'),
    '#description' => t('This setting will ignore the "Form CSS IDs" field above and apply to all public forms.'),
  );  **/

  return system_settings_form($form);
}

