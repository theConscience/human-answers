'use strict';

document.addEventListener('DOMContentLoaded', function() {

  var dataSet = {
    descriptions: [
      [
        'Подразумевает ли буквальный смысл реплики некоторую простую реакцию по смыслу?',
        'В буквальном смысле реплики или её форме есть что-то негативное?',
        'Пытается ли Человек упомянуть что-то эмоционально важноe для меня, чтобы усилить воздействие?'
      ],
      [
        'С каким контактным чувством эта реплика была произнесена Человеком?',
        'Какая эмоция должна возникнуть у меня, на контактное чувство Человека?',
        'Если эта эмоция болезненная, то возникает ли в ответ защитная агрессия?',
        'Если эта эмоция у меня возникнет, обрадует ли это Человека?',
        'Хочет ли Человек некоторого принципиального изменения моего отношения к нему?'
      ],
      [
        'Какое первое неприятное переживание у меня возникло? (кроме агрессии)',
        'В какой эмоциональной реакции я нуждался в тот момент, когда Человек начал говорить?',
        'Является ли Человек, человеком, отношение которого для меня очень значимо?'
      ],
      [
        'Хочет ли Человек добиться от меня некоторого изменения поведения?',
        'Есть ли у Человека некоторый скрытый мотив или выгода воздействовать на меня так?'
      ],
      [
        'Понимаю ли я какое хорошее переживание толкает Человека говорить свою реплику?',
        'Есть ли у меня идеи, хотел ли Человек сделать что-то хорошее своей репликой?',
        'Как Человек должен был бы правильно обратиться ко мне в такой ситуации?'
      ],
      [
        'Хотите еще несколько вариантов ответов, которые подходят всегда?'
      ],
      [
        '...'
      ]
    ],
    questions: [
      [
        'Человек хочет чтобы я...',
        'Человек, ты хочешь сказать, что я...',
        'Человек, ты хочешь напомнить мне о...'
      ],
      [
        'Человек говорит это с...',
        'Человек хочет вызвать у меня...',
        'Возникает? (или пропустите)',
        'Человек хочет вызвать...',
        'Человек, ты хочешь чтобы я...'
      ],
      [
        'Я почувствовал{{ gender_ending }}...',
        'Человек, мне хотелось чтобы ты...',
        'Является? (или пропустите)'
      ],
      [
        'Человек хочет чтобы я...',
        'Человек хочет чтобы я...'
      ],
      [
        'Человек, т.е. ты переживаешь...',
        'Человек, т.е. ты хотел...',
        'Нужная реплика...'
      ],
      [
        'Хотите? (или пропустите)'
      ],
      [
        'Как тебя зовут {{ gender im }}?'
      ]
    ],
    answers: [
      [
        'Ты хочешь чтобы я сейчас {{ answer }}?',
        'Ты хочешь сказать, что я {{ answer }}?',
        'Ты напоминаешь мне о {{ answer }}, чтобы сделать мне неприятно?'
      ],
      [
        'Почему ты говоришь об этом с {{ answer }}?',
        [
          'Ты хочешь чтобы я почувствовал{{ gender_ending }} {{ answer }}?',
          '(Утрированно показать {{ answer }} вместо ответа)'
        ],
        'Когда ты говоришь это, я чувствую растерянность и уязвлённость',
        [
          'Правильно ли я понимаю, что ты радуешься, когда я испытываю {{ answer }}?',
          'Я вижу ты рад это подметить'
        ],
        'Я правильно понимаю, что ты хочешь, чтобы я всегда {{ answer }}?'
      ],
      [
        'Когда ты это сказал, я почувствовал{{ gender_ending }} {{ answer }}',
        'Знаешь, до твоей реплики, в этот момент, мне хотелось, чтобы ты {{ answer }}',
        'Ты важный для меня человек, и меня ранит, когда ты так говоришь...'
      ],
      [
        'Я правильно понимаю, что ты хочешь, чтобы я {{ answer }}?',
        'Правильно ли я понимаю, что на самом деле ты хочешь, чтобы я {{ answer }}?'
      ],
      [
        '(с заботой) Правильно ли я чувствую, что на самом деле ты переживаешь {{ answer }}?',
        '(с заботой) Правильно ли я понимаю, что ты стараешься {{ answer }}?',
        'Я правильно понимаю, что ты хотел сказать «{{ answer }}»?'
      ],
      [
        [
          '(с паузой и недоумением) Меня озадачивает твоя реплика.',
          '(с паузой и недоумением) Я не знаю как реагировать на эти слова.',
          '(с паузой и вызовом) Прости, не понял{{ gender_ending }}?',
          '(медленно) «{{ phrase }}»... На мой вкус это не очень вежливо.',
          '(медленно) «{{ phrase }}»... Вы сегодня весьма галантны.'
        ]
      ],
      [
        [
          'Хорошо, человек вернёт {{ gender dat }} глаза.',
          'Это был последний шанс {{ gender rod }}.'
        ]
      ]
    ]
  };


  /**
   * Итерирует по объектам типа NodeList.
   * @param {object} nodelist
   * @param {function} callback
   * @param {object} scope
   */
  var forEachNode = function(nodelist, callback, scope) {
    for (var i = 0; i < nodelist.length; i++) {
      callback.call(scope, i, nodelist[i]);
    }
  };


  /**
   * @constructor
   */
  var Questionnaire = function(data) {
    console.log('Questionnaire constructor called!');

    var self = this;

    this.data = data;

    this.groups = {};

    var GROUP_NAMES = [
      'literal meaning',
      'emotional impact',
      'own emotional processes',
      'behavior impact',
      'understanding of the other',
      'special',
      'secret'
    ];
    var GROUP_QUESTIONS = [
      'Вопросы к слою буквального смысла',
      'Вопросы к слою эмоционального воздействия',
      'Вопросы про собственные эмоциональные процессы',
      'Вопросы к слою воздействия на поведение',
      'Вопросы про понимание другого',
      'Особые вопросы',
      'Секретные вопросы'
    ];
    var GROUP_ANSWERS = [
      'Ответы по буквальному смыслу',
      'Ответы на эмоциональное воздействие',
      'Ответы про собственные эмоциональные процессы',
      'Ответы про воздействие на поведение',
      'Ответы про понимание другого',
      'Особые ответы',
      'Секретные ответы'
    ];

    this.activeGroup = {
      number: 0,
      getName: function() {
        return GROUP_NAMES[this.number];
      },
      getQuestionName: function() {
        return GROUP_QUESTIONS[this.number];
      },
      getAnswerName: function() {
        return GROUP_ANSWERS[this.number];
      }
    };

    this.getGroupsLength = function(groupType) {
      console.log('this.getGroupsLength called!');
      var summedLength = 0;
      if (groupType === 'descriptions') {
        GROUP_NAMES.forEach(function(item, i) {
          summedLength += self.data.descriptions[i].length;
        });
      } else if (groupType === 'questions') {
        GROUP_NAMES.forEach(function(item, i) {
          summedLength += self.data.questions[i].length;
        });
      } else if (groupType === 'answers') {
        GROUP_NAMES.forEach(function(item, i) {
          summedLength += self.data.answers[i].length;
        });
      }
      console.log('summedLength =', summedLength);
      return summedLength;
    };

    this.getGroupLength = function(groupNumber) {
      console.log('this.getGroupLength called!');
      groupNumber = groupNumber || this.activeGroup.number;
      var groupDescriptionsLength = this.data.descriptions[groupNumber].length;
      var groupQuestionsLength = this.data.questions[groupNumber].length;
      var groupAnswersLength = this.data.answers[groupNumber].length;
      var group = this.groups[self.GROUP_NAMES[groupNumber]] = {};
      group.descriptionsLength = groupDescriptionsLength;
      group.questionsLength = groupQuestionsLength;
      group.answersLength = groupAnswersLength;
      var result = 'group ' + GROUP_NAMES[groupNumber] + ' has:\n';
      result += groupDescriptionsLength + ' descriptions;\n';
      result += groupQuestionsLength + ' questions;\n';
      result += groupAnswersLength + ' answers;\n';
      return result;
    };

    this.checkGroupLength = function(groupNumber) {
      console.log('this.checkGroupLength called!');
      groupNumber = groupNumber || this.activeGroup.number;
      this.getGroupLength(groupNumber);
    };

    this.getGroupNumber = function(num) {
      console.log('this.getGroupNumber called!\n with num =', num);
      var summedLength = 0;
      for (var i = 0; i < GROUP_NAMES.length; i++) {
        summedLength += self.data.descriptions[i].length;
        if (num < summedLength) {
          console.log('this.getGroupNumber return', i);
          if (this.activeGroup.number !== i) {  // если номер группы изменился
            this.activeGroup.number = i;
            console.log('active group changed to #', i, ' ,', this.activeGroup.getName());
            var groupChangeEvent = new CustomEvent('group:change', {
              'bubbles': true,
              'cancelable': true,
              'detail': i
            });
            document.dispatchEvent(groupChangeEvent);
          }
          return i;
        }
      }
      return -1;
    };

    this.getTextNumber = function(num) {
      console.log('this.getTextNumber called!\n with num =', num);
      var summedLength = 0;
      var prevSummedLength = 0;
      for (var i = 0; i < GROUP_NAMES.length; i++) {
        summedLength += self.data.descriptions[i].length;
        if (num < summedLength) {
          console.log('this.getTextNumber return', num - prevSummedLength);
          return num - prevSummedLength;
        }
        prevSummedLength = summedLength;
      }
      return -1;
    };
  };  // end of constructor Questionnaire


  /**
   * @constructor
   */
  var HumanAnswers = function(data) {
    console.log('HumanAnswers constructor called!');
    var self = this;

    this.data = data;

    this.header = document.getElementById('menu-header');
    this.resetButtons = document.querySelectorAll('.reset');
    this.saveButtons = document.querySelectorAll('.save');

    this.step1 = document.getElementById('step-1');
    this.step2 = document.getElementById('step-2');
    this.step3 = document.getElementById('step-3');
    this.phraseElement = this.step1.querySelector('#phrase');
    this.answerElement = this.step3.querySelector('#answer');
    this.saveStep1Button = this.step1.querySelector('.save-step');
    this.saveStep2Button = this.step2.querySelector('.save-step');
    this.getAnswerButton = this.step3.querySelector('.get-answer');
    this.savedPhraseElement = this.step3.querySelector('.saved-phrase');
    this.resultElement = this.step3.querySelector('.result');

    this.answers = this.step3.querySelector('.answers');
    this.allAnswers = this.step3.querySelector('.all-answers');
    this.allAnswersList = this.allAnswers.querySelector('.answers-list');

    this.questionGroupElement = this.step3.querySelector('.question-group');
    this.questionGroupNumberElement = this.questionGroupElement.querySelector('.question-group-number');
    this.questionGroupTitleElement = this.questionGroupElement.querySelector('.question-group-title');
    this.questionDescriptionElement = this.step3.querySelector('.question-description');
    this.questionLabelElement = this.step3.querySelector('.mdl-textfield__label[for="answer"]');

    this.prevButton = this.step3.querySelector('.prev-button');
    this.nextButton = this.step3.querySelector('.next-button');

    this.init = function() {
      console.log('init was called!');
      console.log('this', this);
      console.log('self', self);
      self.questionnaire = new Questionnaire(self.data);
      self.questionsLength = self.questionnaire.getGroupsLength('descriptions');
      // window.questionnaire = self.questionnaire;

      self.savedGender = null;
      self.genderEnding = null;
      // self.stepNumber = localStorage.getItem('stepNumber') || 0;
      // self.questionNumber = localStorage.getItem('questionNumber') || 0;
      self.stepNumber = 0;
      self.questionNumber = 0;
      // self.notLastQuestion = questionNumber < questionsLength - 1;
      // self.isLastQuestion = questionNumber === questionsLength - 1;
      self.gotPhrase = false;
      self.gotGender = false;

      self.questionGroupNumberElement.textContent = self.questionnaire.activeGroup.number + 1 + '. ';
      self.questionGroupTitleElement.textContent = self.questionnaire.activeGroup.getQuestionName();
      self.questionDescriptionElement.textContent = self.questionnaire.activeGroup.number + 1 + '.' + (self.questionnaire.getTextNumber(self.questionNumber) + 1) + '. ' + self.getQuestionDescriptionText(self.questionNumber);
      self.questionLabelElement.textContent = self.getQuestionLabelText(self.questionNumber);
    };

    this.reset = function(evt) {
      evt.preventDefault();
      console.log('\n-----\nreset was called!\n-----');
      if (!self.step3.classList.contains('hidden')) {
        self.step3.classList.add('hidden');
      }
      if (!self.step2.classList.contains('hidden')) {
        self.step2.classList.add('hidden');
      }
      self.step1.classList.remove('hidden');

      self.phraseElement.value = '';
      var checkedGenderElement = document.querySelector('[name="gender_option"]:checked');
      checkedGenderElement.parentNode.classList.remove('is-checked');
      checkedGenderElement.checked = false;
      self.answerElement.value = '';
      self.allAnswers.innerHTML = '';

      self.init();
    };

    this.isLastQuestionCheck = function() {
      if (self.questionNumber < self.questionsLength - 1) {
        return false;
      }
      if (self.questionNumber === self.questionsLength - 1) {
        return true;
      }
    };

    this.savePhrase = function() {
      console.log('savePhrase called!');
      if (self.phraseElement.value) {
        self.step1.classList.add('hidden');
        self.step2.classList.remove('hidden');
        self.savedPhraseElement.textContent = self.phraseElement.value;
        self.gotPhrase = true;
      }
    };

    this.saveGender = function() {
      console.log('saveGender called!');
      var checkedGenderElement = document.querySelector('[name="gender_option"]:checked');
      if (checkedGenderElement) {
        self.step2.classList.add('hidden');
        self.step3.classList.remove('hidden');
        self.nextButton.classList.remove('invisible');
        self.genderEnding = checkedGenderElement.value === 'f' ? 'а' : '';
        self.savedGender = checkedGenderElement.value === 'f' ? 'Девочка' : 'Мальчик';
        console.log('genderEnding =', self.genderEnding);
        console.log('saveGender =', self.savedGender);
        self.gotGender = true;
      }
    };

    this.genderReplacer = function(str, gender, genderCase) {  // будет использоваться в других функциях, использую self
      var result = '';
      var caseEnding = '';
      if (self.savedGender.toLowerCase() === 'девочка') {  // если девочка
        result = self.savedGender.slice(0, self.savedGender.length - 1);
        switch (genderCase) {
          case 'im':  // именительный падеж
            caseEnding = 'a';
            break;
          case 'dat':  // дательный падеж
            caseEnding = 'е';
            break;
          case 'rod':  // родительный падеж
            caseEnding = 'и';
            break;
        }
      } else {  // если мальчик
        result = self.savedGender;
        switch (genderCase) {
          case 'dat':  // дательный падеж
            caseEnding = 'у';
            break;
          case 'rod':  // родительный падеж
            caseEnding = 'а';
            break;
        }
      }
      result += caseEnding;
      return result;
    };

    this.getQuestionDescriptionText = function(num) {
      console.log('getQuestionDescriptionText called!');
      var group = self.questionnaire.getGroupNumber(num);
      var text = self.questionnaire.getTextNumber(num);
      var descriptionText = self.data.descriptions[group][text];
      console.log('returned descriptionText =', descriptionText);
      return descriptionText;
    };

    this.getQuestionLabelText = function(num) {
      console.log('getQuestionLabelText called!');
      var genderEndingRegExp = /{{\s* (gender_ending) +\s*}}/gi;
      var genderRegExp = /({{\s* gender ?(\w+)+\s*}})/gi;
      var group = self.questionnaire.getGroupNumber(num);
      var text = self.questionnaire.getTextNumber(num);
      var questionText = self.data.questions[group][text];
      if (self.gotGender) {
        var generatedQuestion = questionText.replace(genderEndingRegExp, self.genderEnding.toLowerCase());
        generatedQuestion = generatedQuestion.replace(genderRegExp, self.genderReplacer);
        console.log('returned generatedQuestion =', generatedQuestion);
        return generatedQuestion;
      } else {
        console.log('returned questionText =', questionText);
        return questionText;
      }
    };

    this.getQuestionResultText = function(num, answer, phrase) {
      console.log('getQuestionResultText called!');
      var phraseRegExp = /{{\s* (phrase) +\s*}}/gi;
      var answerRegExp = /{{\s* (answer) +\s*}}/gi;
      var genderRegExp = /({{\s* gender ?(\w+)+\s*}})/gi;
      var genderEndingRegExp = /{{\s* (gender_ending) +\s*}}/gi;
      var group = self.questionnaire.getGroupNumber(num);
      var text = self.questionnaire.getTextNumber(num);
      var answerText = self.data.answers[group][text];
      var generatedAnswer = '';

      if (typeof answerText === 'string') {  // если на вопрос только один ответ
        generatedAnswer = answerText.replace(phraseRegExp, phrase.toLowerCase());
        generatedAnswer = generatedAnswer.replace(answerRegExp, answer.toLowerCase());
        generatedAnswer = generatedAnswer.replace(genderEndingRegExp, self.genderEnding.toLowerCase());
        generatedAnswer = generatedAnswer.replace(genderRegExp, self.genderReplacer);
        console.log('returned generatedAnswer =', generatedAnswer);
        return generatedAnswer;

      } else {  // если на вопрос есть несколько вариантов ответов
        var generatedAswers = [];
        if (self.isLastQuestionCheck()) {  // если это последний шуточный вопрос (да/нет вопрос)
          var isRightAnswer = answer.toLowerCase() === 'у девочки нет имени' &&  // условие правильного ответа
            self.savedGender.toLowerCase() === 'девочка' ||
            answer.toLowerCase() === 'у мальчика нет имени' &&
            self.savedGender.toLowerCase() === 'мальчик';
          console.log('последний секретный ответ!');
          if (isRightAnswer) {  // в случае правильного ответа возвращаем первый элемент массива
            console.log('правильный ответ');
            generatedAnswer = answerText[0].replace(phraseRegExp, phrase.toLowerCase());
            generatedAnswer = generatedAnswer.replace(answerRegExp, answer.toLowerCase());
            generatedAnswer = generatedAnswer.replace(genderEndingRegExp, self.genderEnding.toLowerCase());
            generatedAnswer = generatedAnswer.replace(genderRegExp, self.genderReplacer);
            console.log('returned generatedAnswer =', generatedAnswer);
            return generatedAnswer;
          } else {  // в случае неправильного ответа возвращаем второй элемент массива
            console.log('неправильный ответ');
            generatedAnswer = answerText[1].replace(phraseRegExp, phrase.toLowerCase());
            generatedAnswer = generatedAnswer.replace(answerRegExp, answer.toLowerCase());
            generatedAnswer = generatedAnswer.replace(genderEndingRegExp, self.genderEnding.toLowerCase());
            generatedAnswer = generatedAnswer.replace(genderRegExp, self.genderReplacer);
            console.log('returned generatedAnswer =', generatedAnswer);
            return generatedAnswer;
          }
        } else {  // если это не последний вопрос, и нужно просто вывести все ответы
          answerText.forEach(function(item) {
            generatedAnswer = item.replace(phraseRegExp, phrase);
            generatedAnswer = generatedAnswer.replace(answerRegExp, answer.toLowerCase());
            generatedAnswer = generatedAnswer.replace(genderEndingRegExp, self.genderEnding.toLowerCase());
            generatedAnswer = generatedAnswer.replace(genderRegExp, self.genderReplacer);
            console.log('returned generatedAnswer =', generatedAnswer);
            generatedAswers.push(generatedAnswer);
          });
        }
        return generatedAswers;

      }
    };

    this.renderNewAnswer = function(value, groupNum, container) {
      if (self.answers.classList.contains('hidden')) {
        self.answers.classList.remove('hidden');
      }
      self.resultElement.textContent = value;
      if (!self.isLastQuestionCheck()) {  // последний вопрос шуточный, так что мы не добавляем ответ на него в список
        var newAnswerListItem = document.createElement('li');
        newAnswerListItem.className = 'answers-list-item mdl-list__item';
        var newAnswerListItemContent = document.createElement('span');
        newAnswerListItemContent.className = 'mdl-list__item-primary-content';
        newAnswerListItemContent.textContent = value;
        newAnswerListItem.appendChild(newAnswerListItemContent);
        var answersList = container.querySelector('.answers-group-' + groupNum);
        if (!answersList) {
          answersList = document.createElement('ul');
          answersList.className = 'mdl-list answers-list answers-group-' + groupNum;
          var answersListGroupName = document.createElement('li');
          answersListGroupName.className = 'answers-list-item answers-list-item-group-name mdl-list__item';
          answersListGroupName.textContent = groupNum + '. ' + self.questionnaire.activeGroup.getAnswerName() + ':';
          answersList.appendChild(answersListGroupName);
          container.appendChild(answersList);
        }
        answersList.appendChild(newAnswerListItem);
      }
    };

    // Generator function
    this.generate = function() {
      console.log('generate called!');
      // resultElement.textContent = Generator.generate(name.value);
      var newAnswer = self.getQuestionResultText(self.questionNumber, self.answerElement.value, self.savedPhraseElement.textContent);
      console.log('newAnswer =', newAnswer);
      console.log('typeof newAnswer', typeof newAnswer);
      console.log('newAnswer instanceof Array =', newAnswer instanceof Array);
      if (typeof newAnswer === 'string') {
        self.renderNewAnswer(newAnswer, self.questionnaire.activeGroup.number + 1, self.allAnswers);
      } else {
        newAnswer.forEach(function(item) {
          self.renderNewAnswer(item, self.questionnaire.activeGroup.number + 1, self.allAnswers);
        });
      }
    };

    this.changeQuestion = function(num) {
      console.log('changeQuestion called! with number =', num);
      self.questionNumber = num;
      self.answerElement.value = '';

      self.questionDescriptionElement.textContent = self.getQuestionDescriptionText(self.questionNumber);
      self.questionLabelElement.textContent = self.getQuestionLabelText(self.questionNumber);
      self.questionGroupNumberElement.textContent = self.questionnaire.activeGroup.number + 1 + '. ';
      self.questionGroupTitleElement.textContent = self.questionnaire.activeGroup.getQuestionName();
      self.questionDescriptionElement.textContent = self.questionnaire.activeGroup.number + 1 + '.' +
          (self.questionnaire.getTextNumber(self.questionNumber) + 1) +
          '. ' + self.questionDescriptionElement.textContent;

      if (self.questionNumber < 1) {
        self.prevButton.classList.add('invisible');
      } else {
        self.prevButton.classList.remove('invisible');
      }
      if (self.questionNumber >= self.questionsLength - 1) {
        self.nextButton.classList.add('invisible');
      } else {
        self.nextButton.classList.remove('invisible');
      }

      //localStorage.setItem('questionNumber', this.questionNumber);
    };

    this.nextQuestion = function() {
      console.log('nextQuestion called!');
      self.changeQuestion(self.questionNumber + 1);
    };

    this.prevQuestion = function() {
      console.log('prevQuestion called!');
      self.changeQuestion(self.questionNumber - 1);
    };


    /** Event listeners */
    this.listenEvents = function() {
      console.log('listenEvents was called!');

      // Save step 1
      self.saveStep1Button.addEventListener('click', function() {
        console.log('saveStep1Button event listener called!');
        self.savePhrase();
      });

      // Save step 2
      self.saveStep2Button.addEventListener('click', function() {
        console.log('saveStep2Button event listener called!');
        self.saveGender();
      });

      // Generate button
      self.getAnswerButton.addEventListener('click', function() {
        console.log('getAnswerButton event listener called!');
        if (self.questionNumber <= self.questionsLength) {
          self.generate();
        }
        if (!self.isLastQuestionCheck()) {  // not last question
          self.nextQuestion();
        }
      });

      // On page enter press
      document.body.addEventListener('keypress', function(event) {
        if (event.which === 13 || event.keyCode === 13) {
          console.log('document body "keypress" event listener called!');
          event.preventDefault();
          if (!self.gotPhrase) {
            self.savePhrase();
          } else if (!self.gotGender) {
            self.saveGender();
          } else {
            if (self.questionNumber <= self.questionsLength) {
              self.generate();
            }
            if (self.questionNumber < self.questionsLength) {
              self.nextQuestion();
            }
          }
        }
      });

      self.prevButton.addEventListener('click', self.prevQuestion);
      self.nextButton.addEventListener('click', self.nextQuestion);

      forEachNode(self.resetButtons, function(index, node) {
        console.log('forEachNode callback called ' + index + ' time');
        console.log('node is', node);
        console.log(self.reset);
        node.addEventListener('click', self.reset);
      });
    };
    /** End of event listeners */

    this.unListenEvents = function() {
      return 'no unlistenEvents!';
    };

  };  // end of constructor HumanAnswers


  // var isLastQuestionCheck = function() {
  //   if (questionNumber < questionsLength - 1) {
  //     return false;
  //   }
  //   if (questionNumber === questionsLength - 1) {
  //     return true;
  //   }
  // };


  var saveViaEmail = function() {
    console.log('Your generated answers set will be sended to your e-mail...');
  };


  /**
   * @constructor
   */
  var StepSelector = function() {
    var STEPS_NAMES = [
      'get:phrase',
      'select:gender',
      'answer:questions'
    ];

    this.activeStep = {
      number: 0,
      name: STEPS_NAMES[this.number]
    };

    this.renderStep = function(stepNumber) {
      console.log('rendering ' + this.activeStep.name + ' step');
      switch (this.activeStep.name) {
        case 'get:phrase':
          break;
        case 'select:gender':
          break;
        case 'answer:questions':
          questionnaire.start();
        default:
          console.log('unknown step!');
          break;
      }
      return;
    };

    this.changeStep = function(num) {
      num = num || this.activeStep.number + 1;
      this.activeStep.number++;
      this.renderStep(this.activeStep.number);
    };

    this.nextStep = function() {
      if (this.activeStep.number < STEPS_NAMES.length - 2) {
        this.changeStep(this.activeStep.number + 1);
      }
    };

    this.previousStep = function() {
      if (this.activeStep.number > 0) {
        this.changeStep(this.activeStep.number - 1);
      }
    };

    this.validateStep = function() {
      return
    };
  };


  /**
   * @constructor
   */
  var AnswerGenerator = function(data) {
    console.log('AnswerGenerator constructor called!');
    this.data = data;

    this.init = function() {
      console.log('this.init called!');
      var questionnaire = new Questionnaire(this.data);
      renderStep(0);
    };

    this.generate = function() {
      return
    };

    this.saveAnswers = function() {
      return
    };
  };


  var humanAnswers = new HumanAnswers(dataSet);
  window.humanAnswers = humanAnswers;
  humanAnswers.init();
  humanAnswers.listenEvents();
});
