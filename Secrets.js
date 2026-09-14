function requireSecret(name) {
  var key = String(name || '').trim();
  if (!key) throw new Error('Secret name is required.');
  var value = PropertiesService.getScriptProperties().getProperty(key);
  if (!value || !String(value).trim()) {
    throw new Error('Required secret is missing: ' + key);
  }
  return String(value);
}

function redact(input) {
  if (input == null) return input;

  if (typeof input === 'string') return redactString_(input);
  if (typeof input === 'number' || typeof input === 'boolean') return input;

  if (Array.isArray(input)) {
    return input.map(function (item) { return redact(item); });
  }

  if (Object.prototype.toString.call(input) === '[object Object]') {
    var out = {};
    Object.keys(input).forEach(function (key) {
      var value = input[key];
      if (isSensitiveKey_(key)) out[key] = '***REDACTED***';
      else out[key] = redact(value);
    });
    return out;
  }

  return redactString_(String(input));
}

function isSensitiveKey_(key) {
  return /(authorization|api[_-]?key|access[-_]?token|token|secret|password|webhook|key)/i.test(String(key || ''));
}

function redactString_(text) {
  var str = String(text || '');
  if (!str) return str;

  str = str.replace(/(Authorization\s*[:=]\s*Bearer\s+)[^\s",]+/gi, '$1***REDACTED***');
  str = str.replace(/(Authorization\s*[:=]\s*)[^\s",]+/gi, '$1***REDACTED***');
  str = str.replace(/([?&](?:api[_-]?key|token|access[_-]?token|secret|password)=)[^&#\\s]+/gi, '$1***REDACTED***');
  str = str.replace(/((?:api[_-]?key|access[_-]?token|token|secret|password)\s*[:=]\s*)["']?[^"',\\s]+["']?/gi, '$1***REDACTED***');
  str = str.replace(/\b(pk|sk)_[A-Za-z0-9_\\-]+/g, '$1_***REDACTED***');
  return str;
}
