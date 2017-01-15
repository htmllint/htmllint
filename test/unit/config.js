describe('Config', function () {
    var Config = require('../../lib/config');
    var config = null,
        rule = null,
        option = null;

    beforeEach(function () {
        config = new Config([{name:'html'}], []);
        rule = {
            name: 'therule',
            on: ['html']
        };
        option = {
            name: 'theoption',
            rules: ['therule'],
            process: function (val) { return val; }
        };
    });

    it('should be a function', function () {
        expect(Config).to.be.an.instanceOf(Function);
    });

    describe('getRule', function () {
        it('should return undefined for nonexistant rule', function () {
            var rule = config.getRule('nonexistant');

            expect(rule).to.be.a('undefined');
        });
    });

    describe('addRule', function () {
        it('should add a rule', function () {
            config.addRule(rule);

            var addedRule = config.getRule(rule.name);

            expect(addedRule).to.be.equal(rule);
        });

        it('should initialize the rule', function () {
            config.addRule({name:'test'});

            var addedRule = config.getRule('test');

            expect(addedRule.name).to.be.eql('test');
            expect(addedRule.on).to.be.eql([]);
            expect(addedRule.subscribers).to.be.eql([]);
        });

        it('should remove a previous rule', function () {
            var oldRule = {};
            oldRule.name = rule.name;

            config.addRule(oldRule);
            config.addRule(rule);

            var addedRule = config.getRule(rule.name);

            expect(addedRule).to.be.equal(rule);
        });
    });

    describe('removeRule', function () {
        it('should remove a rule', function () {
            config.addRule(rule);
            config.removeRule(rule.name);

            var addedRule = config.getRule(rule.name);

            expect(addedRule).to.be.a('undefined');
        });

        it('should not throw when removing a nonregistered rule', function () {
            config.removeRule('nonexistant');
        });
    });

    describe('addOption', function () {
        it('should add an option', function () {
            config.addOption(option);

            var addedOption = config.options[option.name];

            expect(addedOption).to.be.equal(option);
        });

        it('should initialize the option', function () {
            config.addOption({name:'test'});

            var addedOption = config.options['test'];

            expect(addedOption.name).to.be.eql('test');
            expect(addedOption.rules).to.be.eql(['test']);
        });
    });

    describe('setOption', function () {
        it('should subscribe and unsubscribe the rule', function () {
            config.addRule(rule);
            config.addOption(option);
            var html = config.getRule('html');

            config.setOption(option.name, true);
            expect(rule.subscribers).to.be.eql([option]);
            expect(html.subscribers).to.be.eql([rule]);

            config.setOption(option.name, false);
            expect(rule.subscribers).to.be.eql([]);
            expect(html.subscribers).to.be.eql([]);
        });
    });
});
