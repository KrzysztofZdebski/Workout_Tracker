import unittest
import json

from app.modules.calorie_counter.controller import Calorie_counterController


def test_index():
    calorie_counter_controller = Calorie_counterController()
    result = calorie_counter_controller.index()
    assert result == {'message': 'Hello, World!'}
