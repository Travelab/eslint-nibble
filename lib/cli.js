'use strict';

var _nibbler = require('./nibbler');

var _nibbler2 = _interopRequireDefault(_nibbler);

var _formatters = require('./config/formatters');

var fmt = _interopRequireWildcard(_formatters);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _options = require('./config/options');

var _options2 = _interopRequireDefault(_options);

var _package = require('../package.json');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cli = {

  execute: function execute(args) {
    var currentOptions = void 0,
        files = void 0,
        extensions = void 0,
        config = void 0;

    // Parse options
    try {
      currentOptions = _options2.default.parse(args);
      files = currentOptions._;
      extensions = currentOptions.ext;
      config = currentOptions.config;
    } catch (error) {
      console.error(error.message);
      return 1;
    }

    // Decide what to do based on options
    if (currentOptions.version) {
      // Show version from package.json
      console.log('v' + _package.version);
    } else if (currentOptions.help || !files.length) {
      // Show help
      console.log(_options2.default.generateHelp());
    } else {
      var configuration = { extensions: extensions };
      if (config) {
        configuration.configFile = config;
      }

      _nibbler2.default.configure(configuration);
      var report = _nibbler2.default.nibbleOnFiles(files);
      if (report && (report.errorCount > 0 || report.warningCount > 0)) {
        // Check if there was a fatal error
        var fatalReport = _nibbler2.default.getFatalResults(report);
        if (fatalReport) {
          var errors = _nibbler2.default.getFormattedResults(fatalReport, 'stylish');
          console.log(errors);
          console.error('Fatal error(s) were detected.  Please correct and try again.');
          return 1;
        }
        // Show stats
        var stats = _nibbler2.default.getFormattedResults(report, fmt.stats);
        console.log(stats);

        // Show summary
        var summary = _nibbler2.default.getFormattedResults(report, fmt.summary);
        console.log(summary);

        // Ask user for rule to narrow in on
        _inquirer2.default.prompt([{
          name: 'rule',
          type: 'input',
          message: 'Type in the rule you want to focus on'
        }]).then(function gotInput(answers) {
          // Display detailed error reports
          var ruleName = answers.rule;
          var ruleResults = _nibbler2.default.getRuleResults(report, ruleName);
          var detailed = _nibbler2.default.getFormattedResults(ruleResults, fmt.detailed);
          console.log(detailed);
        });
        // No report or not any errors or warnings
      } else {
        console.log(_chalk2.default.green('Great job, all lint rules passed.'));
        return 0;
      }
    }
    return 0;
  }
};

module.exports = cli;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGkuanMiXSwibmFtZXMiOlsiZm10IiwiY2xpIiwiZXhlY3V0ZSIsImFyZ3MiLCJjdXJyZW50T3B0aW9ucyIsImZpbGVzIiwiZXh0ZW5zaW9ucyIsImNvbmZpZyIsInBhcnNlIiwiXyIsImV4dCIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJ2ZXJzaW9uIiwibG9nIiwiaGVscCIsImxlbmd0aCIsImdlbmVyYXRlSGVscCIsImNvbmZpZ3VyYXRpb24iLCJjb25maWdGaWxlIiwiY29uZmlndXJlIiwicmVwb3J0IiwibmliYmxlT25GaWxlcyIsImVycm9yQ291bnQiLCJ3YXJuaW5nQ291bnQiLCJmYXRhbFJlcG9ydCIsImdldEZhdGFsUmVzdWx0cyIsImVycm9ycyIsImdldEZvcm1hdHRlZFJlc3VsdHMiLCJzdGF0cyIsInN1bW1hcnkiLCJwcm9tcHQiLCJuYW1lIiwidHlwZSIsInRoZW4iLCJnb3RJbnB1dCIsImFuc3dlcnMiLCJydWxlTmFtZSIsInJ1bGUiLCJydWxlUmVzdWx0cyIsImdldFJ1bGVSZXN1bHRzIiwiZGV0YWlsZWQiLCJncmVlbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7O0FBQ0E7O0lBQVlBLEc7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlDLE1BQU07O0FBRVJDLFdBQVMsaUJBQVVDLElBQVYsRUFBZ0I7QUFDdkIsUUFBSUMsdUJBQUo7QUFBQSxRQUNJQyxjQURKO0FBQUEsUUFFSUMsbUJBRko7QUFBQSxRQUdJQyxlQUhKOztBQUtBO0FBQ0EsUUFBSTtBQUNGSCx1QkFBaUIsa0JBQVFJLEtBQVIsQ0FBY0wsSUFBZCxDQUFqQjtBQUNBRSxjQUFRRCxlQUFlSyxDQUF2QjtBQUNBSCxtQkFBYUYsZUFBZU0sR0FBNUI7QUFDQUgsZUFBU0gsZUFBZUcsTUFBeEI7QUFDRCxLQUxELENBS0UsT0FBT0ksS0FBUCxFQUFjO0FBQ2RDLGNBQVFELEtBQVIsQ0FBY0EsTUFBTUUsT0FBcEI7QUFDQSxhQUFPLENBQVA7QUFDRDs7QUFFRDtBQUNBLFFBQUlULGVBQWVVLE9BQW5CLEVBQTRCO0FBQzFCO0FBQ0FGLGNBQVFHLEdBQVIsQ0FBWSxzQkFBWjtBQUNELEtBSEQsTUFHTyxJQUFJWCxlQUFlWSxJQUFmLElBQXdCLENBQUNYLE1BQU1ZLE1BQW5DLEVBQTRDO0FBQ2pEO0FBQ0FMLGNBQVFHLEdBQVIsQ0FBWSxrQkFBUUcsWUFBUixFQUFaO0FBQ0QsS0FITSxNQUdBO0FBQ0wsVUFBTUMsZ0JBQWdCLEVBQUViLHNCQUFGLEVBQXRCO0FBQ0EsVUFBSUMsTUFBSixFQUFZO0FBQ1ZZLHNCQUFjQyxVQUFkLEdBQTJCYixNQUEzQjtBQUNEOztBQUVELHdCQUFRYyxTQUFSLENBQWtCRixhQUFsQjtBQUNBLFVBQUlHLFNBQVMsa0JBQVFDLGFBQVIsQ0FBc0JsQixLQUF0QixDQUFiO0FBQ0EsVUFBSWlCLFdBQVdBLE9BQU9FLFVBQVAsR0FBb0IsQ0FBcEIsSUFBeUJGLE9BQU9HLFlBQVAsR0FBc0IsQ0FBMUQsQ0FBSixFQUFrRTtBQUNoRTtBQUNBLFlBQUlDLGNBQWMsa0JBQVFDLGVBQVIsQ0FBd0JMLE1BQXhCLENBQWxCO0FBQ0EsWUFBSUksV0FBSixFQUFpQjtBQUNmLGNBQUlFLFNBQVMsa0JBQVFDLG1CQUFSLENBQTRCSCxXQUE1QixFQUF5QyxTQUF6QyxDQUFiO0FBQ0FkLGtCQUFRRyxHQUFSLENBQVlhLE1BQVo7QUFDQWhCLGtCQUFRRCxLQUFSLENBQWMsOERBQWQ7QUFDQSxpQkFBTyxDQUFQO0FBQ0Q7QUFDRDtBQUNBLFlBQUltQixRQUFRLGtCQUFRRCxtQkFBUixDQUE0QlAsTUFBNUIsRUFBb0N0QixJQUFJOEIsS0FBeEMsQ0FBWjtBQUNBbEIsZ0JBQVFHLEdBQVIsQ0FBWWUsS0FBWjs7QUFFQTtBQUNBLFlBQUlDLFVBQVUsa0JBQVFGLG1CQUFSLENBQTRCUCxNQUE1QixFQUFvQ3RCLElBQUkrQixPQUF4QyxDQUFkO0FBQ0FuQixnQkFBUUcsR0FBUixDQUFZZ0IsT0FBWjs7QUFFQTtBQUNBLDJCQUFTQyxNQUFULENBQWdCLENBQUM7QUFDZkMsZ0JBQVMsTUFETTtBQUVmQyxnQkFBUyxPQUZNO0FBR2ZyQixtQkFBUztBQUhNLFNBQUQsQ0FBaEIsRUFLR3NCLElBTEgsQ0FLUSxTQUFTQyxRQUFULENBQWtCQyxPQUFsQixFQUEyQjtBQUMvQjtBQUNBLGNBQUlDLFdBQVdELFFBQVFFLElBQXZCO0FBQ0EsY0FBSUMsY0FBYyxrQkFBUUMsY0FBUixDQUF1Qm5CLE1BQXZCLEVBQStCZ0IsUUFBL0IsQ0FBbEI7QUFDQSxjQUFJSSxXQUFXLGtCQUFRYixtQkFBUixDQUE0QlcsV0FBNUIsRUFBeUN4QyxJQUFJMEMsUUFBN0MsQ0FBZjtBQUNBOUIsa0JBQVFHLEdBQVIsQ0FBWTJCLFFBQVo7QUFDRCxTQVhIO0FBWUY7QUFDQyxPQS9CRCxNQStCTztBQUNMOUIsZ0JBQVFHLEdBQVIsQ0FBWSxnQkFBTTRCLEtBQU4sQ0FBWSxtQ0FBWixDQUFaO0FBQ0EsZUFBTyxDQUFQO0FBQ0Q7QUFDRjtBQUNELFdBQU8sQ0FBUDtBQUNEO0FBdkVPLENBQVY7O0FBMEVBQyxPQUFPQyxPQUFQLEdBQWlCNUMsR0FBakIiLCJmaWxlIjoiY2xpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbmliYmxlciBmcm9tICcuL25pYmJsZXInO1xuaW1wb3J0ICogYXMgZm10IGZyb20gJy4vY29uZmlnL2Zvcm1hdHRlcnMnO1xuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJztcbmltcG9ydCBpbnF1aXJlciBmcm9tICdpbnF1aXJlcic7XG5pbXBvcnQgb3B0aW9ucyBmcm9tICcuL2NvbmZpZy9vcHRpb25zJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuXG5sZXQgY2xpID0ge1xuXG4gIGV4ZWN1dGU6IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgbGV0IGN1cnJlbnRPcHRpb25zLFxuICAgICAgICBmaWxlcyxcbiAgICAgICAgZXh0ZW5zaW9ucyxcbiAgICAgICAgY29uZmlnO1xuXG4gICAgLy8gUGFyc2Ugb3B0aW9uc1xuICAgIHRyeSB7XG4gICAgICBjdXJyZW50T3B0aW9ucyA9IG9wdGlvbnMucGFyc2UoYXJncyk7XG4gICAgICBmaWxlcyA9IGN1cnJlbnRPcHRpb25zLl87XG4gICAgICBleHRlbnNpb25zID0gY3VycmVudE9wdGlvbnMuZXh0O1xuICAgICAgY29uZmlnID0gY3VycmVudE9wdGlvbnMuY29uZmlnO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgLy8gRGVjaWRlIHdoYXQgdG8gZG8gYmFzZWQgb24gb3B0aW9uc1xuICAgIGlmIChjdXJyZW50T3B0aW9ucy52ZXJzaW9uKSB7XG4gICAgICAvLyBTaG93IHZlcnNpb24gZnJvbSBwYWNrYWdlLmpzb25cbiAgICAgIGNvbnNvbGUubG9nKCd2JyArIHZlcnNpb24pO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudE9wdGlvbnMuaGVscCB8fCAoIWZpbGVzLmxlbmd0aCkpIHtcbiAgICAgIC8vIFNob3cgaGVscFxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucy5nZW5lcmF0ZUhlbHAoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSB7IGV4dGVuc2lvbnMgfTtcbiAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgY29uZmlndXJhdGlvbi5jb25maWdGaWxlID0gY29uZmlnO1xuICAgICAgfVxuXG4gICAgICBuaWJibGVyLmNvbmZpZ3VyZShjb25maWd1cmF0aW9uKTtcbiAgICAgIGxldCByZXBvcnQgPSBuaWJibGVyLm5pYmJsZU9uRmlsZXMoZmlsZXMpO1xuICAgICAgaWYgKHJlcG9ydCAmJiAocmVwb3J0LmVycm9yQ291bnQgPiAwIHx8IHJlcG9ydC53YXJuaW5nQ291bnQgPiAwKSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSB3YXMgYSBmYXRhbCBlcnJvclxuICAgICAgICBsZXQgZmF0YWxSZXBvcnQgPSBuaWJibGVyLmdldEZhdGFsUmVzdWx0cyhyZXBvcnQpO1xuICAgICAgICBpZiAoZmF0YWxSZXBvcnQpIHtcbiAgICAgICAgICBsZXQgZXJyb3JzID0gbmliYmxlci5nZXRGb3JtYXR0ZWRSZXN1bHRzKGZhdGFsUmVwb3J0LCAnc3R5bGlzaCcpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9ycyk7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignRmF0YWwgZXJyb3Iocykgd2VyZSBkZXRlY3RlZC4gIFBsZWFzZSBjb3JyZWN0IGFuZCB0cnkgYWdhaW4uJyk7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2hvdyBzdGF0c1xuICAgICAgICBsZXQgc3RhdHMgPSBuaWJibGVyLmdldEZvcm1hdHRlZFJlc3VsdHMocmVwb3J0LCBmbXQuc3RhdHMpO1xuICAgICAgICBjb25zb2xlLmxvZyhzdGF0cyk7XG5cbiAgICAgICAgLy8gU2hvdyBzdW1tYXJ5XG4gICAgICAgIGxldCBzdW1tYXJ5ID0gbmliYmxlci5nZXRGb3JtYXR0ZWRSZXN1bHRzKHJlcG9ydCwgZm10LnN1bW1hcnkpO1xuICAgICAgICBjb25zb2xlLmxvZyhzdW1tYXJ5KTtcblxuICAgICAgICAvLyBBc2sgdXNlciBmb3IgcnVsZSB0byBuYXJyb3cgaW4gb25cbiAgICAgICAgaW5xdWlyZXIucHJvbXB0KFt7XG4gICAgICAgICAgbmFtZSAgIDogJ3J1bGUnLFxuICAgICAgICAgIHR5cGUgICA6ICdpbnB1dCcsXG4gICAgICAgICAgbWVzc2FnZTogJ1R5cGUgaW4gdGhlIHJ1bGUgeW91IHdhbnQgdG8gZm9jdXMgb24nXG4gICAgICAgIH1dKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIGdvdElucHV0KGFuc3dlcnMpIHtcbiAgICAgICAgICAgIC8vIERpc3BsYXkgZGV0YWlsZWQgZXJyb3IgcmVwb3J0c1xuICAgICAgICAgICAgbGV0IHJ1bGVOYW1lID0gYW5zd2Vycy5ydWxlO1xuICAgICAgICAgICAgbGV0IHJ1bGVSZXN1bHRzID0gbmliYmxlci5nZXRSdWxlUmVzdWx0cyhyZXBvcnQsIHJ1bGVOYW1lKTtcbiAgICAgICAgICAgIGxldCBkZXRhaWxlZCA9IG5pYmJsZXIuZ2V0Rm9ybWF0dGVkUmVzdWx0cyhydWxlUmVzdWx0cywgZm10LmRldGFpbGVkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRldGFpbGVkKTtcbiAgICAgICAgICB9KTtcbiAgICAgIC8vIE5vIHJlcG9ydCBvciBub3QgYW55IGVycm9ycyBvciB3YXJuaW5nc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coY2hhbGsuZ3JlZW4oJ0dyZWF0IGpvYiwgYWxsIGxpbnQgcnVsZXMgcGFzc2VkLicpKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsaTtcbiJdfQ==