describe('Config', function () {
    var Config = require('../../lib/config');
    var config = null,
        rule = null,
        baseRule = null,
        option = null;

    beforeEach(function () {
        config = new Config();
        baseRule = { name: 'base' };
        rule = {
            name: 'therule',
            on: ['base']
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
        it('should return undefined for nonexistent rule', function () {
            var rule = config.getRule('nonexistent');

            expect(rule).to.be.a('undefined');
        });
    });

    describe('initialize', function () {
        it('should initialize rules', function () {
            config = new Config([baseRule, rule]);

            expect(config.getRule(rule.name)).to.be.eql(rule);
            expect(config.getRule(baseRule.name)).to.be.eql(baseRule);
        });

        it('should initialize both rules and options', function () {
            config = new Config([baseRule, rule], [option]);

            expect(config.getRule(rule.name)).to.be.eql(rule);
            expect(config.getRule(baseRule.name)).to.be.eql(baseRule);
            expect(config.options[option.name]).to.be.eql(option);
        });

        it('should get options from a rule', function () {
            rule.options = [option];
            config = new Config([baseRule, rule]);

            expect(config.options[option.name]).to.be.eql(option);
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

        it('should not initialize the same rule twice', function () {
            config.addRule(rule);
            rule.subscribers = ['test'];
            config.addRule(rule);
            expect(rule.subscribers).to.be.eql(['test']);
        });

        it('should remove a previous rule', function () {
            var oldRule = {};
            oldRule.name = rule.name;

            config.addRule(oldRule);
            config.addRule(rule);

            var addedRule = config.getRule(rule.name);

            expect(addedRule).to.be.equal(rule);
        });

        it('should remove a previous rule\'s subcriptions', function () {
            config.addRule(baseRule);
            config.addRule(rule);
            config.addOption(option);
            config.setOption(option.name, true);

            var newRule = { name: rule.name, on: [] };
            config.addRule(newRule);

            expect(newRule.subscribers).to.be.eql([option]);
            expect(baseRule.subscribers).to.be.eql([]);
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
            config.removeRule('nonexistent');
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

            var addedOption = config.options.test;

            expect(addedOption.name).to.be.eql('test');
            expect(addedOption.rules).to.be.eql(['test']);
        });

        it('should not initialize the same option twice', function () {
            config.addOption(option);
            option.active = true;
            config.addOption(option);
            expect(option.active).to.be.eql(true);
        });

        it('should maintain active and update subscriptions', function () {
            config.addRule(baseRule);
            config.addRule(rule);
            var option2 = {
                name: option.name,
                rules: [baseRule.name],
                process: option.process
            };
            config.addOption(option2);
            config.setOption(option.name, true);

            config.addOption(option);
            expect(option.active).to.be.eql(true);
            expect(baseRule.subscribers).to.be.eql([rule]);
            expect(rule.subscribers).to.be.eql([option]);

            config.addOption(option2);
            expect(option2.active).to.be.eql(true);
            expect(baseRule.subscribers).to.be.eql([option2]);
            expect(rule.subscribers).to.be.eql([]);
        });
    });

    describe('setOption', function () {
        it('should subscribe and unsubscribe the rule', function () {
            config.addRule(baseRule);
            config.addRule(rule);
            config.addOption(option);

            config.setOption(option.name, true);
            expect(rule.subscribers).to.be.eql([option]);
            expect(baseRule.subscribers).to.be.eql([rule]);

            config.setOption(option.name, false);
            expect(rule.subscribers).to.be.eql([]);
            expect(baseRule.subscribers).to.be.eql([]);

            var option2 = {
                name: 'option2',
                rules: option.rules,
                process: option.process
            }
            config.addOption(option2);
            config.setOption(option.name, true);
            config.setOption(option2.name, true);
            config.setOption(option.name, false);
            expect(rule.subscribers).to.be.eql([option2]);
            expect(baseRule.subscribers).to.be.eql([rule]);

            config.setOption(option2.name, false);
            expect(rule.subscribers).to.be.eql([]);
            expect(baseRule.subscribers).to.be.eql([]);
        });
    });

    describe('removeOption', function () {
        it('should remove the option', function () {
            config.addOption(option);
            config.removeOption(option.name);
            expect(config.options[option.name]).to.be.undefined;
        });

        it('should remove the option\'s subcriptions', function () {
            config.addRule(baseRule);
            config.addRule(rule);
            config.addOption(option);
            config.setOption(option.name, true);
            config.removeOption(option.name);
            expect(rule.subscribers).to.be.eql([]);
            expect(baseRule.subscribers).to.be.eql([]);
        });

        it('should not fail on nonexistent option', function () {
            config.removeOption('nonexistent');
        });
    });
});
