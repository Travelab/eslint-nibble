'use strict';

var _eslint = require('eslint');

var cli = new _eslint.CLIEngine({});

function getCounts(messages) {
  var counts = messages.reduce(function (result, message) {
    if (message.severity === 1) {
      result.warningCount++;
    }
    if (message.severity === 2) {
      result.errorCount++;
    }
    return result;
  }, { errorCount: 0, warningCount: 0 });

  return counts;
}

/**
 * Get only the results wanted from a report
 * @param  {object} report   The report to filter
 * @param  {string} msgKey   Name of the message property on which to filter
 * @param  {object} options  Options to use for comparison
 * @return {object}          Report object which only contains messages that pass filter
 */
function filterResults(report, msgKey, options) {
  var newResults = {};
  var totalErrors = 0;
  var totalWarnings = 0;
  newResults.results = report.results.map(function (result) {
    var filteredMessages = result.messages.filter(function (msg) {
      if (options.present) {
        return msg[msgKey];
      }
      if (options.compareVal) {
        return msg[msgKey] === options.compareVal;
      }
      return false;
    });
    if (filteredMessages) {
      var _getCounts = getCounts(filteredMessages),
          errorCount = _getCounts.errorCount,
          warningCount = _getCounts.warningCount;

      totalErrors += errorCount;
      totalWarnings += warningCount;
      return {
        filePath: result.filePath,
        messages: filteredMessages,

        errorCount: errorCount,
        warningCount: warningCount
      };
    }
    return {};
  });
  newResults.errorCount = totalErrors;
  newResults.warningCount = totalWarnings;
  return newResults;
}

module.exports = {
  configure: function configure(configuration) {
    cli = new _eslint.CLIEngine(configuration);
  },
  nibbleOnFiles: function nibbleOnFiles(files) {
    var report = cli.executeOnFiles(files);
    return report;
  },
  getFatalResults: function getFatalResults(report) {
    var fatalResults = filterResults(report, 'fatal', { present: true });
    if (fatalResults.errorCount > 0) {
      return fatalResults;
    }
    return undefined;
  },
  getFormattedResults: function getFormattedResults(report, fmt) {
    var formatter = cli.getFormatter(fmt);
    return formatter(report.results);
  },
  getRuleResults: function getRuleResults(report, ruleName) {
    var ruleResults = filterResults(report, 'ruleId', { compareVal: ruleName });
    return ruleResults;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uaWJibGVyLmpzIl0sIm5hbWVzIjpbImNsaSIsImdldENvdW50cyIsIm1lc3NhZ2VzIiwiY291bnRzIiwicmVkdWNlIiwicmVzdWx0IiwibWVzc2FnZSIsInNldmVyaXR5Iiwid2FybmluZ0NvdW50IiwiZXJyb3JDb3VudCIsImZpbHRlclJlc3VsdHMiLCJyZXBvcnQiLCJtc2dLZXkiLCJvcHRpb25zIiwibmV3UmVzdWx0cyIsInRvdGFsRXJyb3JzIiwidG90YWxXYXJuaW5ncyIsInJlc3VsdHMiLCJtYXAiLCJmaWx0ZXJlZE1lc3NhZ2VzIiwiZmlsdGVyIiwibXNnIiwicHJlc2VudCIsImNvbXBhcmVWYWwiLCJmaWxlUGF0aCIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb25maWd1cmUiLCJjb25maWd1cmF0aW9uIiwibmliYmxlT25GaWxlcyIsImZpbGVzIiwiZXhlY3V0ZU9uRmlsZXMiLCJnZXRGYXRhbFJlc3VsdHMiLCJmYXRhbFJlc3VsdHMiLCJ1bmRlZmluZWQiLCJnZXRGb3JtYXR0ZWRSZXN1bHRzIiwiZm10IiwiZm9ybWF0dGVyIiwiZ2V0Rm9ybWF0dGVyIiwiZ2V0UnVsZVJlc3VsdHMiLCJydWxlTmFtZSIsInJ1bGVSZXN1bHRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7QUFDQSxJQUFJQSxNQUFNLHNCQUFjLEVBQWQsQ0FBVjs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxRQUFuQixFQUE2QjtBQUMzQixNQUFJQyxTQUFTRCxTQUFTRSxNQUFULENBQWdCLFVBQVVDLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCO0FBQ3RELFFBQUlBLFFBQVFDLFFBQVIsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJGLGFBQU9HLFlBQVA7QUFDRDtBQUNELFFBQUlGLFFBQVFDLFFBQVIsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJGLGFBQU9JLFVBQVA7QUFDRDtBQUNELFdBQU9KLE1BQVA7QUFDRCxHQVJZLEVBUVYsRUFBRUksWUFBWSxDQUFkLEVBQWlCRCxjQUFjLENBQS9CLEVBUlUsQ0FBYjs7QUFVQSxTQUFPTCxNQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7QUFPQSxTQUFTTyxhQUFULENBQXVCQyxNQUF2QixFQUErQkMsTUFBL0IsRUFBdUNDLE9BQXZDLEVBQWdEO0FBQzlDLE1BQUlDLGFBQWEsRUFBakI7QUFDQSxNQUFJQyxjQUFjLENBQWxCO0FBQ0EsTUFBSUMsZ0JBQWdCLENBQXBCO0FBQ0FGLGFBQVdHLE9BQVgsR0FBcUJOLE9BQU9NLE9BQVAsQ0FBZUMsR0FBZixDQUFtQixVQUFVYixNQUFWLEVBQWtCO0FBQ3hELFFBQUljLG1CQUFtQmQsT0FBT0gsUUFBUCxDQUFnQmtCLE1BQWhCLENBQXVCLFVBQVVDLEdBQVYsRUFBZTtBQUMzRCxVQUFJUixRQUFRUyxPQUFaLEVBQXFCO0FBQ25CLGVBQVFELElBQUlULE1BQUosQ0FBUjtBQUNEO0FBQ0QsVUFBSUMsUUFBUVUsVUFBWixFQUF3QjtBQUN0QixlQUFRRixJQUFJVCxNQUFKLE1BQWdCQyxRQUFRVSxVQUFoQztBQUNEO0FBQ0QsYUFBTyxLQUFQO0FBQ0QsS0FSc0IsQ0FBdkI7QUFTQSxRQUFJSixnQkFBSixFQUFzQjtBQUFBLHVCQUNlbEIsVUFBVWtCLGdCQUFWLENBRGY7QUFBQSxVQUNkVixVQURjLGNBQ2RBLFVBRGM7QUFBQSxVQUNGRCxZQURFLGNBQ0ZBLFlBREU7O0FBRXBCTyxxQkFBZU4sVUFBZjtBQUNBTyx1QkFBaUJSLFlBQWpCO0FBQ0EsYUFBTztBQUNMZ0Isa0JBQVVuQixPQUFPbUIsUUFEWjtBQUVMdEIsa0JBQVVpQixnQkFGTDs7QUFJTFYsOEJBSks7QUFLTEQ7QUFMSyxPQUFQO0FBT0Q7QUFDRCxXQUFPLEVBQVA7QUFDRCxHQXZCb0IsQ0FBckI7QUF3QkFNLGFBQVdMLFVBQVgsR0FBd0JNLFdBQXhCO0FBQ0FELGFBQVdOLFlBQVgsR0FBMEJRLGFBQTFCO0FBQ0EsU0FBT0YsVUFBUDtBQUNEOztBQUVEVyxPQUFPQyxPQUFQLEdBQWlCO0FBRWZDLFdBRmUscUJBRUxDLGFBRkssRUFFVTtBQUN2QjVCLFVBQU0sc0JBQWM0QixhQUFkLENBQU47QUFDRCxHQUpjO0FBTWZDLGVBTmUseUJBTURDLEtBTkMsRUFNTTtBQUNuQixRQUFJbkIsU0FBU1gsSUFBSStCLGNBQUosQ0FBbUJELEtBQW5CLENBQWI7QUFDQSxXQUFPbkIsTUFBUDtBQUNELEdBVGM7QUFXZnFCLGlCQVhlLDJCQVdDckIsTUFYRCxFQVdTO0FBQ3RCLFFBQUlzQixlQUFldkIsY0FBY0MsTUFBZCxFQUFzQixPQUF0QixFQUErQixFQUFFVyxTQUFTLElBQVgsRUFBL0IsQ0FBbkI7QUFDQSxRQUFJVyxhQUFheEIsVUFBYixHQUEwQixDQUE5QixFQUFpQztBQUMvQixhQUFPd0IsWUFBUDtBQUNEO0FBQ0QsV0FBT0MsU0FBUDtBQUNELEdBakJjO0FBbUJmQyxxQkFuQmUsK0JBbUJLeEIsTUFuQkwsRUFtQmF5QixHQW5CYixFQW1Ca0I7QUFDL0IsUUFBSUMsWUFBWXJDLElBQUlzQyxZQUFKLENBQWlCRixHQUFqQixDQUFoQjtBQUNBLFdBQU9DLFVBQVUxQixPQUFPTSxPQUFqQixDQUFQO0FBQ0QsR0F0QmM7QUF3QmZzQixnQkF4QmUsMEJBd0JBNUIsTUF4QkEsRUF3QlE2QixRQXhCUixFQXdCa0I7QUFDL0IsUUFBSUMsY0FBYy9CLGNBQWNDLE1BQWQsRUFBc0IsUUFBdEIsRUFBZ0MsRUFBRVksWUFBWWlCLFFBQWQsRUFBaEMsQ0FBbEI7QUFDQSxXQUFPQyxXQUFQO0FBQ0Q7QUEzQmMsQ0FBakIiLCJmaWxlIjoibmliYmxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQ0xJRW5naW5lIH0gZnJvbSAnZXNsaW50JztcbmxldCBjbGkgPSBuZXcgQ0xJRW5naW5lKHt9KTtcblxuZnVuY3Rpb24gZ2V0Q291bnRzKG1lc3NhZ2VzKSB7XG4gIGxldCBjb3VudHMgPSBtZXNzYWdlcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgbWVzc2FnZSkge1xuICAgIGlmIChtZXNzYWdlLnNldmVyaXR5ID09PSAxKSB7XG4gICAgICByZXN1bHQud2FybmluZ0NvdW50Kys7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLnNldmVyaXR5ID09PSAyKSB7XG4gICAgICByZXN1bHQuZXJyb3JDb3VudCsrO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LCB7IGVycm9yQ291bnQ6IDAsIHdhcm5pbmdDb3VudDogMCB9KTtcblxuICByZXR1cm4gY291bnRzO1xufVxuXG4vKipcbiAqIEdldCBvbmx5IHRoZSByZXN1bHRzIHdhbnRlZCBmcm9tIGEgcmVwb3J0XG4gKiBAcGFyYW0gIHtvYmplY3R9IHJlcG9ydCAgIFRoZSByZXBvcnQgdG8gZmlsdGVyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG1zZ0tleSAgIE5hbWUgb2YgdGhlIG1lc3NhZ2UgcHJvcGVydHkgb24gd2hpY2ggdG8gZmlsdGVyXG4gKiBAcGFyYW0gIHtvYmplY3R9IG9wdGlvbnMgIE9wdGlvbnMgdG8gdXNlIGZvciBjb21wYXJpc29uXG4gKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgIFJlcG9ydCBvYmplY3Qgd2hpY2ggb25seSBjb250YWlucyBtZXNzYWdlcyB0aGF0IHBhc3MgZmlsdGVyXG4gKi9cbmZ1bmN0aW9uIGZpbHRlclJlc3VsdHMocmVwb3J0LCBtc2dLZXksIG9wdGlvbnMpIHtcbiAgbGV0IG5ld1Jlc3VsdHMgPSB7fTtcbiAgbGV0IHRvdGFsRXJyb3JzID0gMDtcbiAgbGV0IHRvdGFsV2FybmluZ3MgPSAwO1xuICBuZXdSZXN1bHRzLnJlc3VsdHMgPSByZXBvcnQucmVzdWx0cy5tYXAoZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIGxldCBmaWx0ZXJlZE1lc3NhZ2VzID0gcmVzdWx0Lm1lc3NhZ2VzLmZpbHRlcihmdW5jdGlvbiAobXNnKSB7XG4gICAgICBpZiAob3B0aW9ucy5wcmVzZW50KSB7XG4gICAgICAgIHJldHVybiAobXNnW21zZ0tleV0pO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuY29tcGFyZVZhbCkge1xuICAgICAgICByZXR1cm4gKG1zZ1ttc2dLZXldID09PSBvcHRpb25zLmNvbXBhcmVWYWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIGlmIChmaWx0ZXJlZE1lc3NhZ2VzKSB7XG4gICAgICBsZXQgeyBlcnJvckNvdW50LCB3YXJuaW5nQ291bnQgfSA9IGdldENvdW50cyhmaWx0ZXJlZE1lc3NhZ2VzKTtcbiAgICAgIHRvdGFsRXJyb3JzICs9IGVycm9yQ291bnQ7XG4gICAgICB0b3RhbFdhcm5pbmdzICs9IHdhcm5pbmdDb3VudDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVQYXRoOiByZXN1bHQuZmlsZVBhdGgsXG4gICAgICAgIG1lc3NhZ2VzOiBmaWx0ZXJlZE1lc3NhZ2VzLFxuXG4gICAgICAgIGVycm9yQ291bnQsXG4gICAgICAgIHdhcm5pbmdDb3VudFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9KTtcbiAgbmV3UmVzdWx0cy5lcnJvckNvdW50ID0gdG90YWxFcnJvcnM7XG4gIG5ld1Jlc3VsdHMud2FybmluZ0NvdW50ID0gdG90YWxXYXJuaW5ncztcbiAgcmV0dXJuIG5ld1Jlc3VsdHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGNvbmZpZ3VyZShjb25maWd1cmF0aW9uKSB7XG4gICAgY2xpID0gbmV3IENMSUVuZ2luZShjb25maWd1cmF0aW9uKTtcbiAgfSxcblxuICBuaWJibGVPbkZpbGVzKGZpbGVzKSB7XG4gICAgbGV0IHJlcG9ydCA9IGNsaS5leGVjdXRlT25GaWxlcyhmaWxlcyk7XG4gICAgcmV0dXJuIHJlcG9ydDtcbiAgfSxcblxuICBnZXRGYXRhbFJlc3VsdHMocmVwb3J0KSB7XG4gICAgbGV0IGZhdGFsUmVzdWx0cyA9IGZpbHRlclJlc3VsdHMocmVwb3J0LCAnZmF0YWwnLCB7IHByZXNlbnQ6IHRydWUgfSk7XG4gICAgaWYgKGZhdGFsUmVzdWx0cy5lcnJvckNvdW50ID4gMCkge1xuICAgICAgcmV0dXJuIGZhdGFsUmVzdWx0cztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSxcblxuICBnZXRGb3JtYXR0ZWRSZXN1bHRzKHJlcG9ydCwgZm10KSB7XG4gICAgbGV0IGZvcm1hdHRlciA9IGNsaS5nZXRGb3JtYXR0ZXIoZm10KTtcbiAgICByZXR1cm4gZm9ybWF0dGVyKHJlcG9ydC5yZXN1bHRzKTtcbiAgfSxcblxuICBnZXRSdWxlUmVzdWx0cyhyZXBvcnQsIHJ1bGVOYW1lKSB7XG4gICAgbGV0IHJ1bGVSZXN1bHRzID0gZmlsdGVyUmVzdWx0cyhyZXBvcnQsICdydWxlSWQnLCB7IGNvbXBhcmVWYWw6IHJ1bGVOYW1lIH0pO1xuICAgIHJldHVybiBydWxlUmVzdWx0cztcbiAgfVxufTtcbiJdfQ==