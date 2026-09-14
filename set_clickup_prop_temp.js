/**
 * TEMP: seta a propriedade de script CLICKUP_API_KEY com o valor fornecido.
 * Depois que for executado, o arquivo pode ser removido.
 */
function setClickUpKeyTemp() {
  var props = PropertiesService.getScriptProperties();
  props.setProperty('CLICKUP_API_KEY', 'pk_254580721_TMLG7LS1MXSMDJB815L5TQ6H1QH5BQCC');
  return { ok: true };
}
